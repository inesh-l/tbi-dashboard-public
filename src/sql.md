---
theme: dashboard
title: SQL Input
toc: false
---


```jsx
import {GeminiPrompt} from "./components/GeminiPrompt.js";
display(<GeminiPrompt />);
```

# SQL Input
```js
const text = view(Inputs.textarea({rows: 20}));
```

```js
const submit = view(Inputs.button("Submit", {reduce: () => text}));
```

```js
display(Inputs.table(await sql([submit])));
```