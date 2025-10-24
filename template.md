---
theme: dashboard
title: Data Year 
toc: false
---

```js
const csvfile = view(Inputs.file({label: "CSV file for OHBRFSS [Year]", accept: ".csv", required: true}));
```

```js
csvfile.csv({typed: true})
```

```js
const db = DuckDBClient.of({brfss: csvfile});
```

```jsx
import {GeminiPrompt} from "./components/GeminiPrompt.js";
display(<GeminiPrompt year="[YEAR]" />);
```

```js

// Horizontal line to separate sections
display(html`<hr style="border: none; border-top: 1px solid #000; width: 100%;">`);

// Section title
display(html`<h1>Section Title</h1>`);
display(html`<hr style="border: none; border-top: 1px solid #000; width: 100%;">`);

// Checkbox input
const gender = view(Inputs.checkbox(new Map([["Male", 1], ["Female", 2]]), {value: [1,2], label: "Gender"}));

// Text input
const age = view(Inputs.text({label: "Age"}));
```

```js
// Display SQL using DuckDB WASM with query based on inputs

// For each input, build the query with the following format:
let query = `
SELECT * FROM brfss 
WHERE VARNAME1 IN (null, ${[gender]})
AND (TEXTVAR1 = '${TBIq8}' OR '${TBIq8}' = '')
`

display(Inputs.table(await db.sql([query])))
```