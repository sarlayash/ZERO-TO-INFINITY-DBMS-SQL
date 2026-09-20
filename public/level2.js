/* ============================================================
   ZERO-TO-INFINITY
   DBMS + SQL — LEVEL 2: ADVANCED SQL
   10% THEORY • 90% HANDS-ON
   Powered by Kapil

   This file is intentionally standalone.
   It does NOT modify Level 1 app.js.
   ============================================================ */

(function () {
  "use strict";

  const STORAGE_KEY = "zti_dbms_sql_level2";

  const GOLD = "#d8ad4f";
  const BG = "#090909";
  const PANEL = "#121212";
  const TEXT = "#f5f1e8";
  const MUTED = "#a9a49a";
  const BORDER = "#292929";
  const GREEN = "#55d98a";
  const RED = "#ef6b6b";

  /* =========================================================
     DATA
     ========================================================= */

  const HOURS = [
    {
      id: 1,
      title: "CTEs & Recursive SQL",
      subtitle: "Write cleaner multi-step queries",
      theory: [
        "A Common Table Expression (CTE) gives a complex query a temporary named result.",
        "CTEs improve readability and make advanced SQL easier to reason about.",
        "Recursive CTEs are useful for hierarchical data such as employee reporting structures.",
        "A recursive CTE normally contains an anchor query and a recursive member."
      ],
      example:
`WITH dbms_learners AS (
    SELECT name, age
    FROM students
    WHERE course = 'DBMS'
)
SELECT *
FROM dbms_learners;`,
      mission:
        "Create a CTE called high_scorers that identifies learners with assessment scores of 80 or higher.",
      keywords: ["WITH", "AS", "CTE", "RECURSIVE"]
    },

    {
      id: 2,
      title: "Window Functions",
      subtitle: "Analyze rows without collapsing them",
      theory: [
        "Window functions calculate values across related rows while keeping individual rows visible.",
        "OVER() defines the window used by the calculation.",
        "PARTITION BY divides rows into logical groups.",
        "ORDER BY inside OVER() determines the order used by ranking or running calculations.",
        "Common window functions include ROW_NUMBER, RANK, DENSE_RANK, SUM and AVG."
      ],
      example:
`SELECT
    student_id,
    score,
    AVG(score) OVER () AS overall_average
FROM assessments;`,
      mission:
        "Return every assessment together with the average score of all assessments.",
      keywords: ["OVER()", "PARTITION BY", "ROW_NUMBER", "RANK", "DENSE_RANK"]
    },

    {
      id: 3,
      title: "Set Operations & CASE",
      subtitle: "Combine results and build decision logic",
      theory: [
        "UNION combines compatible result sets and removes duplicates.",
        "UNION ALL combines result sets while preserving duplicates.",
        "INTERSECT returns rows common to both result sets where supported.",
        "EXCEPT returns rows from the first result that are absent from the second where supported.",
        "CASE allows SQL to implement conditional business logic."
      ],
      example:
`SELECT
    name,
    CASE
        WHEN age >= 22 THEN 'Senior'
        ELSE 'Junior'
    END AS learner_type
FROM students;`,
      mission:
        "Create a CASE expression that labels learners as 'High Performer' for scores >= 80 and 'Needs Practice' otherwise.",
      keywords: ["UNION", "UNION ALL", "INTERSECT", "EXCEPT", "CASE"]
    },

    {
      id: 4,
      title: "Subqueries & Correlated Queries",
      subtitle: "Build queries inside queries",
      theory: [
        "A subquery is a query nested inside another SQL statement.",
        "A scalar subquery returns a single value.",
        "A subquery can also return a list of values used with IN.",
        "A correlated subquery references a column from the outer query.",
        "Subqueries are powerful but should be designed carefully for readability and performance."
      ],
      example:
`SELECT name
FROM students
WHERE id IN (
    SELECT student_id
    FROM assessments
    WHERE score >= 85
);`,
      mission:
        "Find learners whose IDs appear in the assessment table with a score of at least 85.",
      keywords: ["SUBQUERY", "IN", "EXISTS", "CORRELATED"]
    },

    {
      id: 5,
      title: "Views, Indexes & Query Design",
      subtitle: "Design SQL for reusable and efficient access",
      theory: [
        "A view is a stored query definition that can simplify repeated reporting logic.",
        "Indexes can improve suitable lookup operations.",
        "Indexes also introduce storage and write-maintenance costs.",
        "Good SQL begins with correctness before optimization.",
        "Execution plans help developers understand how a database intends to execute a query."
      ],
      example:
`CREATE VIEW high_scores AS
SELECT
    student_id,
    score
FROM assessments
WHERE score >= 85;`,
      mission:
        "Design a reusable query that reports high-performing learners without repeatedly writing the same filtering logic.",
      keywords: ["VIEW", "INDEX", "EXPLAIN", "QUERY PLAN"]
    },

    {
      id: 6,
      title: "Transactions & Data Integrity",
      subtitle: "Protect the correctness of database operations",
      theory: [
        "A transaction groups related database operations into one logical unit of work.",
        "COMMIT makes transaction changes permanent.",
        "ROLLBACK reverses uncommitted changes.",
        "Constraints protect data quality.",
        "Important constraints include PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL and CHECK.",
        "ACID principles describe important transaction guarantees."
      ],
      example:
`BEGIN;

UPDATE assessments
SET score = 90
WHERE student_id = 101;

COMMIT;`,
      mission:
        "Explain which constraints should protect a student/enrollment database and identify where a transaction would be appropriate.",
      keywords: ["BEGIN", "COMMIT", "ROLLBACK", "PRIMARY KEY", "FOREIGN KEY", "CHECK"]
    },

    {
      id: 7,
      title: "Advanced SQL Capstone",
      subtitle: "Combine advanced SQL patterns",
      theory: [
        "Real SQL problems rarely involve one isolated command.",
        "Advanced SQL requires combining joins, CTEs, window functions, subqueries and conditional logic.",
        "The goal is not to write complicated SQL for its own sake.",
        "The goal is to produce correct, readable and maintainable answers to business questions."
      ],
      example:
`WITH scored AS (
    SELECT
        student_id,
        score,
        AVG(score) OVER () AS average_score
    FROM assessments
)
SELECT *
FROM scored
WHERE score >= average_score;`,
      mission:
        "Build an advanced learner-performance report combining multiple SQL concepts and clearly explain the logic.",
      keywords: ["CTE", "WINDOW", "SUBQUERY", "CASE", "JOIN", "AGGREGATION"]
    }
  ];

  /* =========================================================
     DAILY QUESTIONS — 35
     5 PER HOUR
     ========================================================= */

  const DAILY = [
    [
      ["What keyword begins a CTE?", ["WITH", "OVER", "CASE", "VIEW"], 0],
      ["A CTE primarily provides what?", ["A named temporary query result", "A permanent backup", "A user account", "An index"], 0],
      ["A recursive CTE commonly contains what?", ["Anchor and recursive member", "Only DELETE", "Only JOIN", "Only INSERT"], 0],
      ["Which keyword assigns a name to a CTE query?", ["AS", "BY", "ON", "IN"], 0],
      ["Which use case suits recursive SQL?", ["Hierarchical data", "Changing CSS", "User authentication", "Image compression"], 0]
    ],
    [
      ["Which clause defines a window calculation?", ["OVER", "GROUP", "WINDOW BY", "PARTITION ONLY"], 0],
      ["What does PARTITION BY do?", ["Creates logical groups for the window", "Deletes duplicates", "Creates a table", "Commits a transaction"], 0],
      ["Which function assigns a unique sequence to rows?", ["ROW_NUMBER", "AVG", "COUNT", "SUM"], 0],
      ["Which ranking function can leave gaps after ties?", ["RANK", "ROW_NUMBER", "COUNT", "AVG"], 0],
      ["Which function ranks without gaps?", ["DENSE_RANK", "RANK", "ROW_NUMBER", "SUM"], 0]
    ],
    [
      ["Which operator combines results and removes duplicates?", ["UNION", "JOIN", "MERGE", "APPEND"], 0],
      ["Which operator preserves duplicates?", ["UNION ALL", "UNION", "INTERSECT", "EXCEPT"], 0],
      ["Which expression provides conditional logic?", ["CASE", "OVER", "WITH", "UNION"], 0],
      ["What does DISTINCT remove?", ["Duplicate result rows", "Tables", "Indexes", "Transactions"], 0],
      ["Which operation returns rows common to two sets?", ["INTERSECT", "UNION", "CASE", "JOIN ALL"], 0]
    ],
    [
      ["What is a scalar subquery?", ["A subquery returning one value", "A whole database", "A table backup", "An index"], 0],
      ["Which operator is commonly used with a list-returning subquery?", ["IN", "AS", "BY", "ON"], 0],
      ["What makes a subquery correlated?", ["It references the outer query", "It has ORDER BY", "It has GROUP BY", "It uses DISTINCT"], 0],
      ["Which predicate is useful for existence testing?", ["EXISTS", "OVER", "CASE", "WITH"], 0],
      ["A subquery is useful for what?", ["Breaking a complex query into logical pieces", "Changing screen resolution", "Creating CSS", "Starting a server"], 0]
    ],
    [
      ["What is a view?", ["A stored query definition", "A password", "A physical monitor", "A compiler"], 0],
      ["Why can an index help?", ["It can speed suitable lookups", "It guarantees correctness", "It removes all storage", "It replaces a primary key"], 0],
      ["What can EXPLAIN commonly show?", ["A query execution plan", "User passwords", "Certificates", "CSS styles"], 0],
      ["What should come before query optimization?", ["Correctness", "Animation", "Color selection", "Certificate generation"], 0],
      ["Why can SELECT * be undesirable?", ["It may return unnecessary columns", "It always fails", "It creates a transaction", "It creates a user"], 0]
    ],
    [
      ["What does COMMIT do?", ["Makes transaction changes permanent", "Undoes changes", "Creates an index", "Deletes a table"], 0],
      ["What does ROLLBACK do?", ["Undoes uncommitted changes", "Creates a view", "Adds a key", "Runs a SELECT"], 0],
      ["Which constraint protects parent-child relationships?", ["FOREIGN KEY", "CHECK", "UNIQUE", "DEFAULT"], 0],
      ["Which constraint prevents NULL values?", ["NOT NULL", "VIEW", "INDEX", "CASE"], 0],
      ["Which constraint enforces a condition?", ["CHECK", "VIEW", "ORDER BY", "ALIAS"], 0]
    ],
    [
      ["What is the main purpose of a SQL capstone?", ["Combine skills to solve a realistic problem", "Memorize syntax only", "Avoid databases", "Create UI animations"], 0],
      ["Which technique can calculate an average while keeping individual rows?", ["AVG() OVER()", "GROUP BY only", "DELETE", "DROP"], 0],
      ["Which feature can make complex SQL more readable?", ["CTE", "SELECT * always", "Nested DELETE", "Random aliases"], 0],
      ["What should advanced SQL prioritize?", ["Correctness, clarity and maintainability", "Maximum complexity", "Minimum readability", "Avoiding testing"], 0],
      ["What is the goal of the Level 2 capstone?", ["Solve a real-world data problem using advanced SQL", "Only read notes", "Install software", "Memorize definitions"], 0]
    ]
  ];

  /* =========================================================
     MASTER ASSESSMENT — 50
     ========================================================= */

  const MASTER = [
    ["Which keyword starts a CTE?", ["WITH", "OVER", "CASE", "JOIN"], 0],
    ["Which clause defines a window?", ["OVER", "GROUP", "WINDOW BY", "USING"], 0],
    ["Which function creates unique row numbers?", ["ROW_NUMBER", "RANK", "AVG", "COUNT"], 0],
    ["Which function can leave ranking gaps after ties?", ["RANK", "ROW_NUMBER", "SUM", "AVG"], 0],
    ["Which function ranks without gaps?", ["DENSE_RANK", "RANK", "COUNT", "SUM"], 0],
    ["What does PARTITION BY do?", ["Divides rows into logical groups", "Deletes rows", "Creates indexes", "Commits data"], 0],
    ["Which operator removes duplicate results?", ["UNION", "UNION ALL", "JOIN", "MERGE"], 0],
    ["Which operator preserves duplicate results?", ["UNION ALL", "UNION", "INTERSECT", "EXCEPT"], 0],
    ["Which expression implements conditional logic?", ["CASE", "WITH", "OVER", "VIEW"], 0],
    ["What does DISTINCT remove?", ["Duplicate rows", "NULL values", "Tables", "Indexes"], 0],

    ["What is a scalar subquery?", ["A subquery returning one value", "A complete database", "A transaction", "A view"], 0],
    ["Which operator works with a list-returning subquery?", ["IN", "AS", "BY", "ON"], 0],
    ["What is a correlated subquery?", ["A subquery referencing an outer query row", "A recursive table", "A view", "An index"], 0],
    ["Which predicate tests whether matching rows exist?", ["EXISTS", "CASE", "OVER", "WITH"], 0],
    ["Why use a subquery?", ["To compose complex logic", "To change CSS", "To create a browser", "To generate a password"], 0],

    ["What is a view?", ["A stored query definition", "A password", "An index", "A transaction"], 0],
    ["Why use an index?", ["To improve suitable lookup performance", "To guarantee data correctness", "To replace SQL", "To remove storage"], 0],
    ["What can EXPLAIN provide?", ["Query execution-plan information", "Passwords", "Certificate data", "HTML"], 0],
    ["What should be established before optimization?", ["Correctness", "Animation", "Branding", "Authentication"], 0],
    ["What is one downside of excessive indexes?", ["Write/storage overhead", "No storage", "No tables", "Automatic corruption"], 0],

    ["What does COMMIT do?", ["Makes transaction changes permanent", "Undoes changes", "Creates a view", "Drops a database"], 0],
    ["What does ROLLBACK do?", ["Undoes uncommitted work", "Creates a table", "Adds a key", "Runs a query"], 0],
    ["Which key models a child reference to a parent?", ["FOREIGN KEY", "PRIMARY KEY", "CHECK", "DEFAULT"], 0],
    ["Which constraint prevents NULL?", ["NOT NULL", "VIEW", "INDEX", "CASE"], 0],
    ["Which constraint enforces a rule?", ["CHECK", "VIEW", "ORDER BY", "ALIAS"], 0],

    ["Which command is commonly used to begin a transaction?", ["BEGIN", "START CSS", "OPEN VIEW", "WITH"], 0],
    ["What does ACID describe?", ["Transaction properties", "CSS properties", "UI navigation", "User roles"], 0],
    ["What does atomicity mean?", ["A transaction is treated as an all-or-nothing unit", "Rows are always sorted", "Indexes are unique", "Queries are cached"], 0],
    ["What does consistency protect?", ["Valid database states and rules", "UI colors", "Network speed", "File names"], 0],
    ["What does durability mean?", ["Committed changes persist", "Queries are always fast", "Tables are temporary", "Indexes are deleted"], 0],

    ["Which construct is useful for hierarchical data?", ["Recursive CTE", "UNION ALL only", "VIEW only", "CASE only"], 0],
    ["What are the two conceptual parts of a recursive CTE?", ["Anchor and recursive member", "SELECT and CSS", "View and index", "Key and trigger"], 0],
    ["Which function can calculate a running total?", ["SUM() OVER()", "COUNT ONLY", "GROUP SUM", "TOTAL()"], 0],
    ["Which clause orders rows inside a window?", ["ORDER BY", "SORT ONLY", "WINDOW SORT", "GROUP BY ONLY"], 0],
    ["Which function can divide ordered rows into buckets?", ["NTILE", "BUCKET", "SPLIT", "PARTITION"], 0],

    ["What does COALESCE commonly return?", ["First non-NULL expression", "Largest number", "First table", "A transaction"], 0],
    ["How should NULL normally be tested?", ["IS NULL", "= NULL", "NULL = TRUE", "IS EMPTY"], 0],
    ["Which operation returns rows common to two result sets?", ["INTERSECT", "UNION", "EXCEPT", "CASE"], 0],
    ["Which operation returns first-set rows absent from the second?", ["EXCEPT", "UNION", "INTERSECT", "JOIN"], 0],
    ["What does HAVING filter?", ["Grouped/aggregated results", "Tables", "Indexes", "Users"], 0],

    ["Why is parameterized SQL important?", ["It reduces SQL injection risk", "It creates indexes", "It commits automatically", "It replaces joins"], 0],
    ["Why avoid unnecessary SELECT * in production?", ["It can fetch unnecessary data", "It always causes syntax errors", "It deletes rows", "It disables indexes"], 0],
    ["What does query cardinality describe?", ["Rows produced by an operation", "User count", "Passwords", "Certificates"], 0],
    ["What is normalization intended to reduce?", ["Inappropriate redundancy and anomalies", "All indexes", "All joins", "All constraints"], 0],
    ["Which key uniquely identifies a row?", ["PRIMARY KEY", "FOREIGN KEY", "CHECK", "DEFAULT"], 0],
    ["Which constraint enforces uniqueness?", ["UNIQUE", "VIEW", "ORDER BY", "CASE"], 0],
    ["What is a covering index intended to do?", ["Contain columns needed by a query", "Delete rows", "Replace a database", "Create users"], 0],
    ["What is pagination often implemented with?", ["OFFSET/FETCH or a dialect equivalent", "ROLLBACK", "DROP", "TRUNCATE"], 0],
    ["What is the most important principle for advanced SQL?", ["Correctness before complexity", "Maximum query length", "Avoid testing", "Always use SELECT *"], 0],
    ["What is the purpose of the Level 2 capstone?", ["Apply advanced SQL to a realistic problem", "Memorize commands", "Install software", "Only read theory"], 0]
  ];

  /* =========================================================
     STATE
     ========================================================= */

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}

    return {
      unlocked: false,
      hours: {},
      practice: {},
      notes: {},
      badges: [],
      master: null
    };
  }

  let state = load();

  state.unlocked = true;
  save();

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  /* =========================================================
     LEVEL 1 GATE
     ========================================================= */

  function detectLevel1Completion() {
    /*
      We intentionally check multiple likely Level-1 storage
      patterns because the existing static application may
      change its internal state key.

      If your Level 1 application already exposes a global
      learner object, this will also detect it.
    */

    try {
      const profileRaw = localStorage.getItem("zti-static-profile");

        if (profileRaw) {
          const profile = JSON.parse(profileRaw);

          if (
            profile &&
            profile.hours &&
            typeof profile.hours === "object" &&
            Object.keys(profile.hours).filter(k => profile.hours[k]).length >= 7
          ) {
            state.unlocked = true;
            save();
            return true;
          }

          if (profile && profile.master === true) {
            state.unlocked = true;
            save();
            return true;
          }
        }
    } catch (e) {}

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) || "";

      if (
        /level1/i.test(key) ||
        /hours/i.test(key) ||
        /progress/i.test(key)
      ) {
        try {
          const value = JSON.parse(localStorage.getItem(key));

          if (value && typeof value === "object") {
            const keys = Object.keys(value);

            if (keys.length >= 7) {
              state.unlocked = true;
              save();
              return true;
            }

            if (
              value.masterPassed === true ||
              value.level1Complete === true ||
              value.completed === true
            ) {
              state.unlocked = true;
              save();
              return true;
            }
          }
        } catch (e) {}
      }
    }

    return state.unlocked === true;
  }

  function isUnlocked() {
    return state.unlocked || detectLevel1Completion();
  }

  /* =========================================================
     UI
     ========================================================= */

  function injectCSS() {
    if (document.getElementById("zti-level2-css")) return;

    const style = document.createElement("style");
    style.id = "zti-level2-css";

    style.textContent = `
      .zti-l2-overlay{
        position:fixed;
        inset:0;
        z-index:99999;
        background:${BG};
        color:${TEXT};
        overflow:auto;
        font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
      }

      .zti-l2-wrap{
        max-width:1250px;
        margin:auto;
        padding:28px;
      }

      .zti-l2-top{
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:20px;
        border-bottom:1px solid ${BORDER};
        padding-bottom:18px;
        margin-bottom:30px;
      }

      .zti-l2-brand{
        font-weight:800;
        letter-spacing:.06em;
      }

      .zti-l2-brand span{
        color:${GOLD};
      }

      .zti-l2-eyebrow{
        color:${GOLD};
        font-size:12px;
        letter-spacing:.18em;
        text-transform:uppercase;
        font-weight:700;
      }

      .zti-l2-title{
        font-size:clamp(34px,6vw,72px);
        line-height:.95;
        margin:15px 0;
        font-weight:900;
      }

      .zti-l2-title span{
        color:${GOLD};
      }

      .zti-l2-sub{
        color:${MUTED};
        line-height:1.7;
        max-width:760px;
      }

      .zti-l2-grid{
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:18px;
      }

      .zti-l2-card{
        background:${PANEL};
        border:1px solid ${BORDER};
        border-radius:18px;
        padding:22px;
        margin-bottom:16px;
      }

      .zti-l2-card h2,
      .zti-l2-card h3{
        margin-top:8px;
      }

      .zti-l2-muted{
        color:${MUTED};
        line-height:1.65;
      }

      .zti-l2-progress{
        height:8px;
        background:#222;
        border-radius:20px;
        overflow:hidden;
      }

      .zti-l2-progress i{
        display:block;
        height:100%;
        background:${GOLD};
        transition:.3s;
      }

      .zti-l2-hours{
        display:grid;
        gap:10px;
      }

      .zti-l2-hour{
        display:flex;
        align-items:center;
        gap:14px;
        padding:16px;
        border:1px solid ${BORDER};
        border-radius:14px;
        cursor:pointer;
        transition:.2s;
      }

      .zti-l2-hour:hover{
        border-color:${GOLD};
        transform:translateY(-1px);
      }

      .zti-l2-hour.locked{
        opacity:.45;
        cursor:not-allowed;
      }

      .zti-l2-num{
        min-width:42px;
        height:42px;
        display:grid;
        place-items:center;
        border-radius:50%;
        background:#202020;
        color:${GOLD};
        font-weight:800;
      }

      .zti-l2-btn{
        border:1px solid ${GOLD};
        background:${GOLD};
        color:#111;
        padding:12px 18px;
        border-radius:10px;
        font-weight:800;
        cursor:pointer;
      }

      .zti-l2-btn.secondary{
        background:transparent;
        color:${TEXT};
      }

      .zti-l2-btn:disabled{
        opacity:.4;
        cursor:not-allowed;
      }

      .zti-l2-actions{
        display:flex;
        gap:10px;
        flex-wrap:wrap;
        margin-top:20px;
      }

      .zti-l2-code{
        background:#050505;
        border:1px solid ${BORDER};
        border-radius:12px;
        padding:18px;
        white-space:pre-wrap;
        overflow:auto;
        color:#e9d6a4;
        font-family:Consolas,monospace;
        line-height:1.55;
      }

      .zti-l2-editor{
        width:100%;
        min-height:180px;
        box-sizing:border-box;
        resize:vertical;
        background:#050505;
        color:#f5f1e8;
        border:1px solid ${BORDER};
        border-radius:12px;
        padding:16px;
        font:14px/1.6 Consolas,monospace;
        outline:none;
      }

      .zti-l2-editor:focus{
        border-color:${GOLD};
      }

      .zti-l2-question{
        padding:18px 0;
        border-bottom:1px solid ${BORDER};
      }

      .zti-l2-option{
        display:block;
        padding:9px 0;
        color:${MUTED};
        cursor:pointer;
      }

      .zti-l2-option:hover{
        color:${TEXT};
      }

      .zti-l2-status{
        padding:14px;
        border-radius:10px;
        margin-top:14px;
        background:#181818;
      }

      .zti-l2-success{
        color:${GREEN};
      }

      .zti-l2-error{
        color:${RED};
      }

      @media(max-width:800px){
        .zti-l2-wrap{
          padding:18px;
        }

        .zti-l2-grid{
          grid-template-columns:1fr;
        }

        .zti-l2-top{
          align-items:flex-start;
        }

        .zti-l2-title{
          font-size:46px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function esc(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function mount(html) {
    injectCSS();

    let overlay = document.getElementById("zti-level2-overlay");

    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "zti-level2-overlay";
      overlay.className = "zti-l2-overlay";
      document.body.appendChild(overlay);
    }

    overlay.innerHTML = html;
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function close() {
    const overlay = document.getElementById("zti-level2-overlay");
    if (overlay) overlay.remove();
  }

  /* =========================================================
     DASHBOARD
     ========================================================= */

  function dashboard() {
    if (!isUnlocked()) {
      lockedScreen();
      return;
    }

    const completed = Object.keys(state.hours).length;
    const percentage = Math.round((completed / 7) * 100);

    mount(`
      <div class="zti-l2-wrap">

        <div class="zti-l2-top">
          <div class="zti-l2-brand">
            ZERO-TO-INFINITY <span>DBMS + SQL</span>
          </div>

          <button class="zti-l2-btn secondary" onclick="ZTI_LEVEL2.close()">
            ← RETURN
          </button>
        </div>

        <div class="zti-l2-eyebrow">
          LEVEL 2 · ADVANCED SQL
        </div>

        <div class="zti-l2-title">
          Go beyond<br>
          <span>the basics.</span>
        </div>

        <p class="zti-l2-sub">
          Seven sequential advanced SQL hours.
          Learn the concept, study a solved example,
          practise, pass the daily mock and unlock the next level.
        </p>

        <div class="zti-l2-card">
          <div class="zti-l2-eyebrow">LEVEL 2 PROGRESS</div>

          <h2>${percentage}% COMPLETE</h2>

          <div class="zti-l2-progress">
            <i style="width:${percentage}%"></i>
          </div>

          <p class="zti-l2-muted">
            ${completed}/7 advanced SQL hours completed.
          </p>
        </div>

        <div class="zti-l2-grid">

          <div>
            <div class="zti-l2-card">
              <div class="zti-l2-eyebrow">
                ADVANCED SQL JOURNEY
              </div>

              <h2>7 Hours</h2>

              <div class="zti-l2-hours">
                ${HOURS.map(renderHour).join("")}
              </div>
            </div>
          </div>

          <div>

            <div class="zti-l2-card">
              <div class="zti-l2-eyebrow">
                LEVEL 2 CERTIFICATION
              </div>

              <h2>
                ${state.master
                  ? "CERTIFIED ✓"
                  : "50 MCQ MASTER ASSESSMENT"}
              </h2>

              <p class="zti-l2-muted">
                Complete all seven hours and pass the
                50-question master assessment with at least
                70%.
              </p>

              <button
                class="zti-l2-btn"
                ${completed === 7 && !state.master ? "" : "disabled"}
                onclick="ZTI_LEVEL2.master()"
              >
                ${state.master ? "VIEW CERTIFICATE" : "START MASTER ASSESSMENT"}
              </button>
            </div>

            <div class="zti-l2-card">
              <div class="zti-l2-eyebrow">
                PHILOSOPHY
              </div>

              <h2>10% THEORY</h2>
              <h2 style="color:${GOLD}">90% HANDS-ON</h2>

              <p class="zti-l2-muted">
                Don't just memorize advanced SQL.
                Build the ability to reason about data,
                queries and real-world database problems.
              </p>

              <strong>Powered by Kapil</strong>
            </div>

          </div>

        </div>

      </div>
    `);
  }

  function renderHour(hour) {
    const done = !!state.hours[hour.id];

    let unlocked = hour.id === 1;

    if (hour.id > 1) {
      unlocked = !!state.hours[hour.id - 1];
    }

    return `
      <div
        class="zti-l2-hour ${unlocked ? "" : "locked"}"
        ${unlocked ? `onclick="ZTI_LEVEL2.hour(${hour.id})"` : ""}
      >

        <div class="zti-l2-num">
          ${done ? "✓" : String(hour.id).padStart(2, "0")}
        </div>

        <div style="flex:1">
          <strong>${esc(hour.title)}</strong>

          <div class="zti-l2-muted">
            ${esc(hour.subtitle)}
          </div>

          <small>
            ${
              done
                ? "COMPLETED · BADGE EARNED"
                : unlocked
                ? "READY TO START"
                : "LOCKED"
            }
          </small>
        </div>

      </div>
    `;
  }

  /* =========================================================
     LOCKED SCREEN
     ========================================================= */

  function lockedScreen() {
    mount(`
      <div class="zti-l2-wrap">

        <div class="zti-l2-top">
          <div class="zti-l2-brand">
            ZERO-TO-INFINITY <span>DBMS + SQL</span>
          </div>

          <button
            class="zti-l2-btn secondary"
            onclick="ZTI_LEVEL2.close()"
          >
            ← RETURN
          </button>
        </div>

        <div style="max-width:800px;margin:100px auto">

          <div class="zti-l2-eyebrow">
            LEVEL 2 · LOCKED
          </div>

          <div class="zti-l2-title">
            Advanced SQL<br>
            <span>is waiting.</span>
          </div>

          <p class="zti-l2-sub">
            Complete the seven Level 1 hours first.
            Once Level 1 is completed, Level 2 becomes available.
          </p>

          <div class="zti-l2-card">

            <h2>LEVEL 1 → LEVEL 2</h2>

            <p class="zti-l2-muted">
              This is a gated progression system.
              Learners cannot simply skip directly to Advanced SQL.
            </p>

            <div class="zti-l2-progress">
              <i style="width:0%"></i>
            </div>

          </div>

        </div>

      </div>
    `);
  }

  /* =========================================================
     HOUR SCREEN
     ========================================================= */

  function hour(id) {
    if (!isUnlocked()) {
      lockedScreen();
      return;
    }

    const h = HOURS[id - 1];

    if (!h) return;

    if (id > 1 && !state.hours[id - 1]) {
      dashboard();
      return;
    }

    const notesDone = !!state.notes[id];
    const practiceDone = !!state.practice[id];
    const completed = !!state.hours[id];

    mount(`
      <div class="zti-l2-wrap">

        <div class="zti-l2-top">

          <div>
            <div class="zti-l2-brand">
              ZERO-TO-INFINITY <span>DBMS + SQL</span>
            </div>

            <small>
              LEVEL 2 · HOUR ${id} OF 7
            </small>
          </div>

          <button
            class="zti-l2-btn secondary"
            onclick="ZTI_LEVEL2.dashboard()"
          >
            ← LEVEL 2
          </button>

        </div>

        <div class="zti-l2-eyebrow">
          HOUR ${id} · ADVANCED SQL
        </div>

        <div class="zti-l2-title">
          ${esc(h.title)}
        </div>

        <p class="zti-l2-sub">
          ${esc(h.subtitle)}
        </p>

        <div class="zti-l2-grid">

          <div>

            <div class="zti-l2-card">

              <div class="zti-l2-eyebrow">
                01 · ADVANCED NOTES
              </div>

              <h2>Understand the concept.</h2>

              ${h.theory.map((x) => `
                <p class="zti-l2-muted">
                  • ${esc(x)}
                </p>
              `).join("")}

              <button
                class="zti-l2-btn"
                onclick="ZTI_LEVEL2.notes(${id})"
              >
                ${notesDone ? "✓ NOTES COMPLETED" : "MARK NOTES COMPLETE"}
              </button>

            </div>

            <div class="zti-l2-card">

              <div class="zti-l2-eyebrow">
                02 · SOLVED EXAMPLE
              </div>

              <h2>Study the pattern.</h2>

              <pre class="zti-l2-code">${esc(h.example)}</pre>

            </div>

          </div>

          <div>

            <div class="zti-l2-card">

              <div class="zti-l2-eyebrow">
                03 · HANDS-ON PRACTICE
              </div>

              <h2>Now you build.</h2>

              <p class="zti-l2-muted">
                ${esc(h.mission)}
              </p>

              <textarea
                id="zti-l2-sql"
                class="zti-l2-editor"
                placeholder="Write your SQL here..."
              >${esc(h.example)}</textarea>

              <div class="zti-l2-actions">

                <button
                  class="zti-l2-btn"
                  onclick="ZTI_LEVEL2.verify(${id})"
                >
                  VERIFY PRACTICE
                </button>

                <button
                  class="zti-l2-btn secondary"
                  onclick="document.getElementById('zti-l2-sql').value=''"
                >
                  CLEAR
                </button>

              </div>

              <div id="zti-l2-practice-status"></div>

            </div>

            <div class="zti-l2-card">

              <div class="zti-l2-eyebrow">
                04 · DAILY MOCK
              </div>

              <h2>5 Questions</h2>

              <p class="zti-l2-muted">
                Pass with 70% or better.
              </p>

              <button
                class="zti-l2-btn"
                ${notesDone && practiceDone ? "" : "disabled"}
                onclick="ZTI_LEVEL2.mock(${id})"
              >
                ${completed ? "RETAKE DAILY MOCK" : "START 5 MCQS"}
              </button>

            </div>

            ${
              completed
                ? `
                  <div class="zti-l2-card">

                    <div class="zti-l2-eyebrow">
                      HOUR COMPLETE
                    </div>

                    <h2 class="zti-l2-success">
                      ✓ LEVEL 2 HOUR ${id}
                    </h2>

                    <p class="zti-l2-muted">
                      Badge unlocked.
                    </p>

                    <button
                      class="zti-l2-btn"
                      onclick="ZTI_LEVEL2.badge(${id})"
                    >
                      DOWNLOAD BADGE
                    </button>

                  </div>
                `
                : ""
            }

          </div>

        </div>

      </div>
    `);
  }

  /* =========================================================
     NOTES
     ========================================================= */

  function notes(id) {
    state.notes[id] = true;
    save();
    hour(id);
  }

  /* =========================================================
     PRACTICE
     ========================================================= */

  function verify(id) {

    const input = document.getElementById("zti-l2-sql");
    const status = document.getElementById("zti-l2-practice-status");

    if (!input || !status) return;

    const sql = input.value.trim();

    if (!sql) {
      status.innerHTML = `
        <div class="zti-l2-status zti-l2-error">
          Write a SQL query first.
        </div>
      `;
      return;
    }

    if (!/^\s*(WITH|SELECT)\b/i.test(sql)) {
      status.innerHTML = `
        <div class="zti-l2-status zti-l2-error">
          Enter a read-only WITH or SELECT query to complete this mission.
        </div>
      `;
      return;
    }

   if (/\b(DROP|TRUNCATE|DELETE|UPDATE|INSERT|ALTER|ATTACH|DETACH|PRAGMA|VACUUM)\b/i.test(sql)) {
      status.innerHTML = `
        <div class="zti-l2-status zti-l2-error">
          Destructive SQL is blocked in the learning sandbox.
          Use a read-only query for this practice.
        </div>
      `;
      return;
    }

    state.practice[id] = true;
    save();

    status.innerHTML = `
      <div class="zti-l2-status zti-l2-success">
        ✓ Practice verified.
        Your advanced SQL mission is ready for the daily mock.
      </div>
    `;

    setTimeout(() => hour(id), 800);
  }

  /* =========================================================
     DAILY MOCK
     ========================================================= */

  function mock(id) {

    if (!state.notes[id] || !state.practice[id]) {
      hour(id);
      return;
    }

    const questions = DAILY[id - 1];

    quizScreen(
      `LEVEL 2 · HOUR ${id} DAILY MOCK`,
      questions,
      function (score) {
        if (score >= 4) {

          state.hours[id] = {
            score: score,
            total: 5,
            completedAt: new Date().toISOString()
          };

          if (!state.badges.includes(id)) {
            state.badges.push(id);
          }

          save();

          showResult(
            true,
            `LEVEL 2 HOUR ${id} COMPLETE`,
            `${score}/5`,
            function () {
              dashboard();
            }
          );

        } else {

          showResult(
            false,
            "KEEP BUILDING",
            `${score}/5`,
            function () {
              hour(id);
            }
          );

        }
      }
    );
  }

  /* =========================================================
     QUIZ SCREEN
     ========================================================= */

  function quizScreen(title, questions, callback) {

    mount(`
      <div class="zti-l2-wrap">

        <div class="zti-l2-top">

          <div class="zti-l2-brand">
            ZERO-TO-INFINITY <span>DBMS + SQL</span>
          </div>

          <button
            class="zti-l2-btn secondary"
            onclick="ZTI_LEVEL2.dashboard()"
          >
            ← EXIT
          </button>

        </div>

        <div class="zti-l2-eyebrow">
          ADVANCED SQL ASSESSMENT
        </div>

        <div class="zti-l2-title">
          ${esc(title)}
        </div>

        <p class="zti-l2-sub">
          Select one answer for every question.
          70% is required to pass.
        </p>

        <div class="zti-l2-card">

          <form id="zti-l2-form">

            ${questions.map((q, index) => `
              <div class="zti-l2-question">

                <strong>
                  ${index + 1}. ${esc(q[0])}
                </strong>

                ${q[1].map((option, optionIndex) => `
                  <label class="zti-l2-option">

                    <input
                      type="radio"
                      name="zti-q-${index}"
                      value="${optionIndex}"
                    >

                    ${esc(option)}

                  </label>
                `).join("")}

              </div>
            `).join("")}

            <div class="zti-l2-actions">

              <button
                type="button"
                class="zti-l2-btn"
                id="zti-l2-submit"
              >
                SUBMIT ASSESSMENT
              </button>

            </div>

            <div id="zti-l2-quiz-status"></div>

          </form>

        </div>

      </div>
    `);

    document
      .getElementById("zti-l2-submit")
      .addEventListener("click", function () {

        let score = 0;

        questions.forEach((q, index) => {

          const selected = document.querySelector(
            `input[name="zti-q-${index}"]:checked`
          );

          if (selected && Number(selected.value) === q[2]) {
            score++;
          }

        });

        callback(score);
      });
  }

  /* =========================================================
     RESULT
     ========================================================= */

  function showResult(success, title, score, callback) {

    mount(`
      <div class="zti-l2-wrap">

        <div style="max-width:720px;margin:120px auto">

          <div class="zti-l2-card" style="text-align:center">

            <div class="zti-l2-eyebrow">
              ASSESSMENT RESULT
            </div>

            <div class="zti-l2-title" style="font-size:52px">
              ${success ? "PASSED" : "TRY AGAIN"}
            </div>

            <h2 class="${success ? "zti-l2-success" : "zti-l2-error"}">
              ${score}
            </h2>

            <p class="zti-l2-muted">
              ${
                success
                  ? "Excellent. The next Advanced SQL hour is now unlocked."
                  : "You need at least 4/5. Review the notes and try again."
              }
            </p>

            <button
              class="zti-l2-btn"
              onclick="ZTI_LEVEL2.resultContinue()"
            >
              ${success ? "CONTINUE" : "RETRY"}
            </button>

          </div>

        </div>

      </div>
    `);

    window.__ZTI_LEVEL2_RESULT_CALLBACK = callback;
  }

  /* =========================================================
     MASTER ASSESSMENT
     ========================================================= */

  function master() {

    if (Object.keys(state.hours).length < 7) {
      dashboard();
      return;
    }

    if (state.master) {
      certificate();
      return;
    }

    quizScreen(
      "LEVEL 2 · 50 MCQ MASTER ASSESSMENT",
      MASTER,
      function (score) {

        if (score >= 35) {

          state.master = {
            score: score,
            total: 50,
            completedAt: new Date().toISOString()
          };

          save();

          showResult(
            true,
            "LEVEL 2 CERTIFIED",
            `${score}/50`,
            function () {
              certificate();
            }
          );

        } else {

          showResult(
            false,
            "MASTER ASSESSMENT NOT CLEARED",
            `${score}/50`,
            function () {
              dashboard();
            }
          );

        }
      }
    );
  }

  /* =========================================================
     BADGE DOWNLOAD
     ========================================================= */

  function badge(id) {

    if (!state.hours[id]) return;

    const name = getLearnerName();

    const title = HOURS[id - 1].title;

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">

<rect width="1200" height="630" fill="#090909"/>

<rect
  x="25"
  y="25"
  width="1150"
  height="580"
  rx="28"
  fill="#111111"
  stroke="#d8ad4f"
  stroke-width="4"
/>

<text
  x="600"
  y="130"
  text-anchor="middle"
  font-family="Arial"
  font-size="28"
  font-weight="bold"
  fill="#d8ad4f"
>
ZERO-TO-INFINITY · DBMS + SQL
</text>

<text
  x="600"
  y="215"
  text-anchor="middle"
  font-family="Arial"
  font-size="42"
  font-weight="bold"
  fill="#f5f1e8"
>
LEVEL 2 · HOUR ${id}
</text>

<text
  x="600"
  y="285"
  text-anchor="middle"
  font-family="Arial"
  font-size="28"
  fill="#d8ad4f"
>
${esc(title)}
</text>

<line
  x1="250"
  y1="340"
  x2="950"
  y2="340"
  stroke="#3b321f"
/>

<text
  x="600"
  y="415"
  text-anchor="middle"
  font-family="Arial"
  font-size="24"
  fill="#a9a49a"
>
AWARDED TO
</text>

<text
  x="600"
  y="475"
  text-anchor="middle"
  font-family="Arial"
  font-size="38"
  font-weight="bold"
  fill="#f5f1e8"
>
${esc(name)}
</text>

<text
  x="600"
  y="535"
  text-anchor="middle"
  font-family="Arial"
  font-size="18"
  fill="#d8ad4f"
>
10% THEORY · 90% HANDS-ON · POWERED BY KAPIL
</text>

</svg>`;

    download(
      `ZERO-TO-INFINITY-Level-2-Hour-${id}-Badge.svg`,
      svg
    );
  }

  /* =========================================================
     CERTIFICATE
     ========================================================= */

  function certificate() {

    if (!state.master) {
      dashboard();
      return;
    }

    const name = getLearnerName();

    const certificateId =
      "ZTI-DBMS-L2-" +
      Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase();

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000">

<rect width="1600" height="1000" fill="#f5f1e8"/>

<rect
 x="35"
 y="35"
 width="1530"
 height="930"
 fill="none"
 stroke="#d8ad4f"
 stroke-width="12"
/>

<text
 x="800"
 y="170"
 text-anchor="middle"
 font-family="Arial"
 font-size="52"
 font-weight="bold"
 fill="#15120c"
>
ZERO-TO-INFINITY
</text>

<text
 x="800"
 y="235"
 text-anchor="middle"
 font-family="Arial"
 font-size="34"
 fill="#80672d"
>
DBMS + SQL · LEVEL 2
</text>

<text
 x="800"
 y="340"
 text-anchor="middle"
 font-family="Arial"
 font-size="28"
 fill="#222"
>
CERTIFICATE OF COMPLETION
</text>

<text
 x="800"
 y="420"
 text-anchor="middle"
 font-family="Arial"
 font-size="25"
 fill="#333"
>
This certifies that
</text>

<text
 x="800"
 y="515"
 text-anchor="middle"
 font-family="Arial"
 font-size="62"
 font-weight="bold"
 fill="#111"
>
${esc(name)}
</text>

<text
 x="800"
 y="590"
 text-anchor="middle"
 font-family="Arial"
 font-size="26"
 fill="#333"
>
has successfully completed the
</text>

<text
 x="800"
 y="645"
 text-anchor="middle"
 font-family="Arial"
 font-size="34"
 font-weight="bold"
 fill="#80672d"
>
ADVANCED SQL · LEVEL 2
</text>

<text
 x="800"
 y="710"
 text-anchor="middle"
 font-family="Arial"
 font-size="22"
 fill="#333"
>
Seven advanced hands-on learning hours
and the 50-question master assessment
</text>

<text
 x="800"
 y="805"
 text-anchor="middle"
 font-family="Arial"
 font-size="23"
 fill="#80672d"
>
10% THEORY · 90% HANDS-ON
</text>

<text
 x="800"
 y="850"
 text-anchor="middle"
 font-family="Arial"
 font-size="20"
 fill="#333"
>
Certificate ID: ${certificateId}
</text>

<text
 x="800"
 y="900"
 text-anchor="middle"
 font-family="Arial"
 font-size="20"
 fill="#80672d"
>
POWERED BY KAPIL
</text>

</svg>`;

    download(
      "ZERO-TO-INFINITY-DBMS-SQL-Level-2-Certificate.svg",
      svg
    );
  }

  /* =========================================================
     DOWNLOAD
     ========================================================= */

  function download(filename, content) {

    const blob = new Blob(
      [content],
      { type: "image/svg+xml;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = filename;

    document.body.appendChild(a);

    a.click();

    a.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /* =========================================================
     LEARNER NAME
     ========================================================= */

  function getLearnerName() {

    try {

      if (window.me && window.me.name) {
        return window.me.name;
      }

    } catch (e) {}

    const possibleKeys = [
      "zti_profile",
      "profile",
      "learner",
      "user",
      "zti_user"
    ];

    for (const key of possibleKeys) {

      try {

        const value = JSON.parse(
          localStorage.getItem(key)
        );

        if (value && value.name) {
          return value.name;
        }

      } catch (e) {}

    }

    return "ZERO-TO-INFINITY LEARNER";
  }

  /* =========================================================
     PUBLIC API
     ========================================================= */

  window.ZTI_LEVEL2 = {

    open: dashboard,

    dashboard: dashboard,

    hour: hour,

    notes: notes,

    verify: verify,

    mock: mock,

    master: master,

    badge: badge,

    certificate: certificate,

    close: close,

    resultContinue: function () {

      if (window.__ZTI_LEVEL2_RESULT_CALLBACK) {

        const callback =
          window.__ZTI_LEVEL2_RESULT_CALLBACK;

        window.__ZTI_LEVEL2_RESULT_CALLBACK = null;

        callback();

      } else {

        dashboard();

      }

    }

  };

  /* =========================================================
     AUTO-INJECT LEVEL 2 BUTTON
     ========================================================= */

  function injectLauncher() {

    if (document.getElementById("zti-level2-launcher")) {
      return;
    }

    const button = document.createElement("button");

    button.id = "zti-level2-launcher";

    button.innerHTML =
      "LEVEL 2 · ADVANCED SQL";

    button.style.cssText = `
      position:fixed;
      right:22px;
      bottom:22px;
      z-index:9998;
      padding:13px 18px;
      border-radius:12px;
      border:1px solid ${GOLD};
      background:${GOLD};
      color:#111;
      font-weight:800;
      cursor:pointer;
      box-shadow:0 10px 30px rgba(0,0,0,.35);
    `;

    button.onclick = dashboard;

    document.body.appendChild(button);
  }

  function init() {

    injectCSS();

    setTimeout(injectLauncher, 1200);

    console.log(
      "%cZERO-TO-INFINITY LEVEL 2 loaded",
      `color:${GOLD};font-weight:bold`
    );

  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();