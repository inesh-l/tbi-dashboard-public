# BRFSS Dashboard

To install dependencies, run:
```
npm i
```
from the project root. Required NodeJS >=18.

This is an [Observable Framework](https://observablehq.com/framework) app. To start the local preview server, run:

```
npm run dev
```

Then visit <http://localhost:3000> to preview your app.

For more, see <https://observablehq.com/framework/getting-started>.

## Project structure (todo: finish this)


```ini
.
├─ src
│  ├─ components
│  │  └─ geminiPrompt.jsx      # Gemini text prompt component
│  ├─ data
│  │  └─ systemPrompt.js       # System prompt for Gemini AI
│  ├─ lib
│  │  ├─ geminiKey.js          # Stores API key for Gemini API
│  │  └─ llm.js                # Controller for making Gemini API calls
│  ├─ [year].md                # GUI data filtering for each year of TBI data
│  ├─ sql.md                   # Manual SQL entry page
│  └─ index.md                 # the home page
├─ .gitignore
├─ observablehq.config.js      # the app config file
├─ package.json
└─ README.md
```

## Preparing data
To set up this project, original BRFSS/TBI SAS data is needed for years 2016-2022. Place .sas7bdat files in /src/sas and run the sas2csv.py script to automatically set up data for the application.

```
python src/scripts/sas2csv.py
```

## Setting up Gemini
Follow the instructions on Google's AI Studio to get an API key, https://aistudio.google.com/apikey. \\
Then, copy your key into /src/lib/geminiKey.js.
```
export const geminiKey = "[API key here]";
```
