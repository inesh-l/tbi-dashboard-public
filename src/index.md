---
toc: false
---

<div class="hero">
  <h1>BRFSS Dashboard</h1>
</div>

<div class="grid grid-cols-2" style="grid-auto-rows: 504px;">
  <div class="">
    <h1>GUI Filtering</h2>
    <p>Click on any of the years on the sidebar to filter the BRFSS database for each year.</p>
  </div>
  <div class="">
    <h1>SQL Input</h2>
    <p>The SQL Input page allows for manual SQL queries. Filter using DuckDB syntax.</p>
  </div>
</div>

<style>

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 4rem 0 8rem;
  text-wrap: balance;
  text-align: center;
}

.hero h1 {
  margin: 1rem 0;
  padding: 1rem 0;
  max-width: none;
  font-size: 14vw;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(30deg, var(--theme-foreground-focus), currentColor);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero h2 {
  margin: 0;
  max-width: 34em;
  font-size: 20px;
  font-style: initial;
  font-weight: 500;
  line-height: 1.5;
  color: var(--theme-foreground-muted);
}

@media (min-width: 640px) {
  .hero h1 {
    font-size: 90px;
  }
}

</style>
