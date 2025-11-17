---
theme: dashboard
title: SQL Playground
toc: false
---

```js
const csvfile = view(Inputs.file({label: "CSV file for BRFSS data", accept: ".csv", required: true}));
```

```js
csvfile.csv({typed: true})
```

```js
const db = DuckDBClient.of({brfss: csvfile});
```

```jsx
import {GeminiSQLPlayground} from "./components/GeminiSQLPlayground.js";
display(<GeminiSQLPlayground year="2022" db={db}/>);
```

## About This Playground

This interactive playground combines AI assistance with direct SQL querying capabilities:

### AI Assistant Features:
- **Smart Analysis**: Ask natural language questions about your TBI data
- **Context-Aware**: Understands BRFSS variables and TBI survey structure
- **Year-Specific Warnings**: Automatically includes data quality notes for specific years

### SQL Playground Features:
- **Direct Database Access**: Run SQL queries directly on your uploaded data
- **Interactive Results**: View query results in formatted tables
- **Quick Examples**: Pre-built queries to get you started
- **Error Handling**: Clear error messages for debugging queries

### Example Questions for AI:
- "What is the prevalence of severe TBI in the dataset?"
- "Show me the demographics of people with multiple TBI exposures"
- "How does TBI prevalence vary by age group and gender?"
- "What are the most common causes of TBI in this data?"

### Example SQL Queries:

**Basic Data Exploration:**
```js
display(Inputs.table(await db.sql`SELECT * FROM brfss LIMIT 10`));
```

```js
display(Inputs.table(await db.sql`SELECT COUNT(*) as total_records FROM brfss`));
```

**TBI Prevalence by Gender:**
```js
display(Inputs.table(await db.sql`
    SELECT 
        CASE WHEN SEXVAR = 1 THEN 'Male' 
             WHEN SEXVAR = 2 THEN 'Female' 
             ELSE 'Unknown' END as gender,
        COUNT(*) as total,
        SUM(CASE WHEN OH8_6 = 1 THEN 1 ELSE 0 END) as with_loss_of_consciousness,
        ROUND(SUM(CASE WHEN OH8_6 = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as prevalence_percent
    FROM brfss 
    WHERE SEXVAR IN (1, 2)
    GROUP BY SEXVAR
    ORDER BY prevalence_percent DESC
`));
```

**Age Distribution of First TBI:**
```js
display(Inputs.table(await db.sql`
    SELECT 
        CASE 
            WHEN OH8_8 < 18 THEN 'Under 18'
            WHEN OH8_8 BETWEEN 18 AND 25 THEN '18-25'
            WHEN OH8_8 BETWEEN 26 AND 40 THEN '26-40'
            WHEN OH8_8 BETWEEN 41 AND 60 THEN '41-60'
            WHEN OH8_8 > 60 THEN 'Over 60'
            ELSE 'Unknown'
        END as age_group,
        COUNT(*) as count
    FROM brfss 
    WHERE OH8_8 IS NOT NULL AND OH8_8 NOT IN (777, 999)
    GROUP BY age_group
    ORDER BY count DESC
`));
```