const app=document.querySelector('#app'),db={students:[{id:1,name:'Aarav',age:21,course:'Java'},{id:2,name:'Meera',age:22,course:'Python'},{id:3,name:'Arjun',age:20,course:'DBMS'},{id:4,name:'Nisha',age:24,course:'DBMS'}],courses:[{id:1,course_name:'Java',duration:12},{id:2,course_name:'Python',duration:10},{id:3,course_name:'DBMS',duration:8}],enrollments:[{id:1,student_id:1,course_id:1},{id:2,student_id:2,course_id:2},{id:3,student_id:3,course_id:3},{id:4,student_id:4,course_id:3}],assessments:[{id:1,student_id:1,score:78},{id:2,student_id:2,score:92},{id:3,student_id:3,score:88},{id:4,student_id:4,score:67}]};
const missions=[{id:'m1',module:'01',title:'Find the DBMS learners',xp:50,objective:'Return every student enrolled in DBMS.',hint:'Filter students by the course column.',check:r=>r.length===2&&r.every(x=>x.course==='DBMS')},{id:'m2',module:'03',title:'Students over 20',xp:50,objective:'Return the names of students older than 20.',hint:'Use WHERE with a comparison.',check:r=>r.length===3&&r.every(x=>x.name&&Object.keys(x).length===1)},{id:'m3',module:'04',title:'Count every student',xp:50,objective:'Return the total number of students.',hint:'Use COUNT(*) AS total_students.',check:r=>r.length===1&&Number(Object.values(r[0])[0])===4},{id:'m5',module:'06',title:'High performers',xp:100,objective:'Return students whose score is at least 85.',hint:'The scores live in assessments.',check:r=>r.length===2&&r.every(x=>Number(x.score)>=85)},{id:'m6',module:'07',title:'Capstone: certificate-ready',xp:500,objective:'Identify learners with a passing assessment score.',hint:'Use the assessments table and a passing threshold of 70.',check:r=>r.length===3&&r.every(x=>Number(x.score)>=70)}],modules=[['01','Database Foundations'],['02','SQL Fundamentals'],['03','Data Filtering'],['04','Sorting & Aggregation'],['05','Relationships & JOINs'],['06','Advanced SQL'],['07','Real-World Capstone']];
const units=[
 ['Data & DBMS Foundations','A database stores related data in organised tables. A DBMS manages storage, access and integrity. A primary key identifies one row; a foreign key connects tables.','SELECT * FROM students;','Inspect every student record.'],
 ['SQL Fundamentals','SQL is the language used to define, add, read and change relational data. SELECT reads rows; INSERT adds; UPDATE changes; DELETE removes.','SELECT name, course FROM students;','Select only the name and course columns.'],
 ['Filtering Data','WHERE limits rows. Combine conditions with AND / OR. Use LIKE for patterns, IN for a list and BETWEEN for a range.','SELECT name FROM students WHERE age > 20;','Find students enrolled in DBMS.'],
 ['Sorting & Aggregation','ORDER BY sorts records. COUNT, SUM, AVG, MIN and MAX turn many rows into a summary. GROUP BY creates one summary per category.','SELECT COUNT(*) AS total_students FROM students;','Count the learners in the workshop dataset.'],
 ['Relationships & JOINs','One-to-many relationships use a foreign key. JOIN combines related rows by matching those keys.','SELECT * FROM enrollments;','Inspect the enrollment bridge table and identify its foreign-key columns.'],
 ['Advanced SQL','Aliases make output readable. CASE creates conditional labels. Subqueries use the result of one query inside another query.','SELECT student_id, score FROM assessments WHERE score >= 85;','Find scores at or above 85.'],
 ['Capstone & Reporting','Translate a business question into tables, keys and queries. Validate assumptions, then present a result that answers the question.','SELECT student_id, score FROM assessments WHERE score >= 70;','Identify certificate-ready learner scores.']
 ];
 const advancedUnits=[
 ['Subqueries','A subquery produces a value or row set for an outer query. Use it when one result logically feeds another query.','SELECT name FROM students WHERE id IN (SELECT student_id FROM assessments WHERE score >= 85);'],
 ['Common Table Expressions','A CTE names a temporary result for one statement. Start with WITH, then query it as if it were a table.','WITH high_scores AS (SELECT * FROM assessments WHERE score >= 85) SELECT * FROM high_scores;'],
 ['Window Functions','Window functions calculate across related rows without collapsing them. OVER defines the window of rows.','SELECT student_id, score, RANK() OVER (ORDER BY score DESC) AS rank FROM assessments;'],
 ['CASE Expressions','CASE adds conditional labels and calculations to query output without changing underlying data.','SELECT name, CASE WHEN age >= 21 THEN \'Adult\' ELSE \'Student\' END AS category FROM students;'],
 ['Views & Data Design','A view is a saved query definition. Design views around stable reporting questions and avoid exposing private columns.','CREATE VIEW dbms_students AS SELECT name, age FROM students WHERE course = \'DBMS\';'],
 ['Transactions & Constraints','Transactions make related changes atomic. Constraints protect validity at the database boundary.','BEGIN; UPDATE assessments SET score = 90 WHERE student_id = 1; COMMIT;'],
 ['Performance & Query Plans','Indexes speed appropriate lookups. Read query plans, select only needed columns, and filter early.','CREATE INDEX idx_students_course ON students(course);']
 ];
 const advancedQuestions=`What keyword begins a common table expression?|WITH;CASE;OVER;VIEW|0
What does a CTE exist for?|One statement;One database;One user;One server|0
Which clause defines a window function frame?|OVER;WHERE;HAVING;FROM|0
Which function numbers rows in order?|ROW_NUMBER;COUNT;SUM;MIN|0
Which function gives equal values the same rank?|RANK;AVG;MAX;COALESCE|0
What does PARTITION BY do?|Splits a window into groups;Deletes rows;Creates a table;Sorts columns|0
Which expression adds conditional output?|CASE;JOIN;ALTER;GRANT|0
Which keyword starts a CASE condition?|WHEN;WHERE;WITH;ON|0
What closes a CASE expression?|END;STOP;COMMIT;RETURN|0
What can CASE return?|A calculated value;A table only;A database;A password|0
What is a view?|Saved query definition;Physical table copy;Index type;User role|0
Which command creates a view?|CREATE VIEW;MAKE VIEW;NEW VIEW;BUILD VIEW|0
Why use a view?|Simplify repeated queries;Delete data;Encrypt files;Create users|0
What is an index for?|Faster lookups;More rows;User login;Backups|0
What can too many indexes slow down?|Writes;SELECT syntax;Views;Permissions|0
What begins a transaction in SQL?|BEGIN;SELECT;CREATE;GRANT|0
What makes a transaction permanent?|COMMIT;ROLLBACK;DELETE;DROP|0
What undoes an uncommitted transaction?|ROLLBACK;COMMIT;SAVE;CHECK|0
What does atomic mean?|All operations succeed or none;Operations are fast;Rows are sorted;Data is public|0
Which constraint limits values by a condition?|CHECK;VIEW;INDEX;ALIAS|0
What does EXPLAIN show?|Query execution plan;Table rows;Passwords;Certificates|0
What should you select for efficiency?|Only needed columns;Always star;All tables;No columns|0
What does a correlated subquery reference?|Outer query row;A view only;An index;A transaction|0
Which operator is common with subqueries?|EXISTS;ALTER;DROP;GRANT|0
What does EXISTS test?|Whether rows are returned;Whether a table is sorted;Whether an index exists;Whether a user exists|0
Which aggregate can be a window function?|SUM;CREATE;DELETE;ALTER|0
What does COALESCE return?|First non-NULL value;Largest value;A row count;A table name|0
What does NULLIF return for equal values?|NULL;Zero;True;The first value|0
Which keyword removes duplicate rows from a result?|DISTINCT;UNIQUE;PRIMARY;CHECK|0
What does an alias improve?|Readability;Disk size;Authentication;Encryption|0
Which clause runs before SELECT logically?|WHERE;ORDER BY;LIMIT;AS|0
What does HAVING filter?|Groups after aggregation;Rows before grouping;Tables;Indexes|0
Which join can reveal unmatched left rows?|LEFT JOIN;INNER JOIN;CROSS JOIN;SELF JOIN|0
What does a composite key use?|Multiple columns;Multiple tables;Multiple users;Multiple views|0
Why parameterize dynamic SQL?|Prevent injection;Create indexes;Increase storage;Sort output|0`.split('\n').map(x=>{let[a,b,c]=x.split('|');return{q:a,options:b.split(';'),answer:+c}});
 const rawQuestions=`What does DBMS stand for?|Database Management System;Data Backup Management System;Digital Business Model System;Database Mapping Service|0
Which key uniquely identifies a table row?|Primary key;Foreign key;Index key;Duplicate key|0
Which SQL statement reads data?|SELECT;INSERT;UPDATE;DELETE|0
Which clause filters rows?|WHERE;ORDER BY;GROUP BY;FROM|0
Which operator combines true conditions?|AND;AS;INTO;BY|0
Which statement adds a new row?|INSERT;SELECT;ALTER;DROP|0
Which statement changes existing rows?|UPDATE;CREATE;SELECT;GRANT|0
Which statement removes rows?|DELETE;REMOVE;ERASE;CLEAR|0
Which keyword creates a table?|CREATE TABLE;MAKE TABLE;NEW TABLE;BUILD TABLE|0
What does NULL mean?|Unknown or missing value;Zero;Empty string;False|0
Which operator tests an exact value?|=;LIKE;BETWEEN;AS|0
Which wildcard matches many characters in LIKE?|%;_;*;#|0
Which wildcard matches one character in LIKE?|_;%;?;#|0
Which keyword checks a list of values?|IN;ON;AS;BY|0
Which keyword checks a range?|BETWEEN;HAVING;UNION;DISTINCT|0
Which clause sorts output?|ORDER BY;GROUP BY;WHERE;HAVING|0
Which function counts rows?|COUNT;SUM;AVG;MAX|0
Which function finds a mean?|AVG;COUNT;MIN;SUM|0
Which clause groups similar values?|GROUP BY;ORDER BY;WHERE;FROM|0
Which clause filters grouped results?|HAVING;WHERE;FROM;LIMIT|0
Which join returns only matching rows?|INNER JOIN;LEFT JOIN;CROSS JOIN;FULL JOIN|0
Which join keeps all left-table rows?|LEFT JOIN;INNER JOIN;RIGHT JOIN;SELF JOIN|0
What usually links two related tables?|Foreign key;View;Alias;Index|0
Which table commonly resolves many-to-many relations?|Junction table;View table;Log table;Backup table|0
What does ON specify in a JOIN?|Match condition;Sort order;Column alias;Table owner|0
Which keyword renames a result column?|AS;ON;IN;BY|0
What is a subquery?|A query inside another query;A deleted query;A sorted query;A backup query|0
What does CASE provide?|Conditional output;A table lock;A join type;A constraint|0
What is a SQL view?|Stored query result definition;Physical backup;User account;Primary key|0
Which operator compares against a subquery list?|IN;AS;BY;SET|0
Which constraint prevents duplicate values?|UNIQUE;DEFAULT;CHECK;NOT NULL|0
Which constraint requires a value?|NOT NULL;UNIQUE;INDEX;VIEW|0
What does DISTINCT remove?|Duplicate result rows;Empty tables;Columns;Constraints|0
Which keyword limits returned rows in many SQL dialects?|LIMIT;STOP;COUNT;BREAK|0
What does COUNT(column) ignore?|NULL values;Numbers;Strings;Rows|0
Which aggregate gives the largest value?|MAX;MIN;AVG;SUM|0
What does a transaction group?|Related database operations;Columns;Views;Indexes|0
Which command makes a transaction permanent?|COMMIT;ROLLBACK;DELETE;SAVE|0
Which command undoes uncommitted work?|ROLLBACK;COMMIT;GRANT;ALTER|0
Why use an index?|Speed up lookups;Store passwords;Delete duplicates;Create users|0
Which normal form removes repeating groups?|First normal form;Third normal form;Fifth normal form;Zero normal form|0
What is referential integrity?|Valid relationships between tables;Fast sorting;Encrypted values;A chart type|0
Which statement removes a table definition?|DROP TABLE;DELETE FROM;TRUNCATE ROW;REMOVE TABLE|0
Which statement removes all table rows but keeps table structure?|DELETE FROM;DROP TABLE;CREATE TABLE;ALTER TABLE|0
What does SELECT * return?|All columns;All tables;Only keys;Only numbers|0
Which clause names the source table?|FROM;WHERE;ORDER BY;HAVING|0
What is an alias?|Temporary name for a table or column;Permanent user;Backup file;Constraint|0
Which type is suited to whole numbers?|INTEGER;TEXT;DATE;BOOLEAN|0
Which type is suited to text?|TEXT;INTEGER;FLOAT;BLOB|0
Why use parameterised queries in production?|Prevent SQL injection;Add more rows;Remove indexes;Create views|0`.split('\n').map(x=>{let[a,b,c]=x.split('|');return{q:a,options:b.split(';'),answer:+c}});
let me=JSON.parse(localStorage.getItem('zti-static-profile')||'null'),active=null;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),save=()=>{localStorage.setItem('zti-static-profile',JSON.stringify(me));let history=JSON.parse(localStorage.getItem('zti-static-history')||'{}');history[me.name]=me;localStorage.setItem('zti-static-history',JSON.stringify(history))};function clock(){let el=document.querySelector('#clock');if(el)el.textContent=new Date().toLocaleString(undefined,{dateStyle:'medium',timeStyle:'medium'})}function layout(x){app.innerHTML=`<main class="shell"><nav class="nav"><div class="brand">ZERO-TO-<b>INFINITY</b> <span class="tag">DBMS + SQL</span></div><div class="live"><span class="pulse"></span> LIVE <span id="clock"></span></div>${me?'<button class="btn ghost" onclick="leave()">LOG OUT</button>':''}</nav>${x}<footer class="footer">© ${new Date().getFullYear()} ZERO-TO-INFINITY · DBMS + SQL · Learning progress is stored on this device.</footer></main>`;clock();clearInterval(window.ztiClock);window.ztiClock=setInterval(clock,1000)}
function landing(){layout(`<section class="hero"><div><div class="eyebrow">CERTIFIED 7-HOUR HANDS-ON WORKSHOP</div><h1>Learn less.<br><span>Build more.</span></h1><p>Practice with a live in-browser SQL dataset, solve missions, and build proof of work - no installation required.</p><div class="actions"><button class="btn" onclick="enter()">START LEARNING</button></div></div><div class="terminal"><pre>-- mission: find DBMS learners
SELECT name, age
FROM students
WHERE course = 'DBMS';

✓ query executed
✓ results verified
+50 XP</pre></div></section><section class="features">${[['7 HOURS','Structured practical workshop'],['LIVE SQL IDE','Query a real browser dataset'],['MISSIONS','Result-based feedback'],['LOCAL PROGRESS','Your work stays on your device']].map(x=>`<div class="feature"><strong>${x[0]}</strong><p>${x[1]}</p></div>`).join('')}</section>`)}
function enter(){layout(`<section class="auth card"><div class="eyebrow">LEARNER ACCESS</div><h2>Start building.</h2><p class="hint">Enter your name and jump in. Returning learners resume their saved history on this device.</p><input id="name" placeholder="Your name" autofocus><p id="err" class="error"></p><button class="btn" onclick="begin()">BEGIN JOURNEY</button></section>`)}function ensure(){if(me){me.done??=[];me.attempts??=[];me.hours??={};me.tasks??={};me.master??=false;me.advanced??={hours:{}}}}function begin(){let name=document.querySelector('#name').value.trim();if(name.length<2)return err.textContent='Enter your name to begin.';let history=JSON.parse(localStorage.getItem('zti-static-history')||'{}');me=history[name]||{name,done:[],attempts:[],hours:{},tasks:{},master:false,advanced:{hours:{}}};save();dashboard()}function leave(){me=null;localStorage.removeItem('zti-static-profile');landing()}
function unlocked(n){return n===1||Boolean(me.hours[n-1])}function dashboard(){ensure();let done=new Set(me.done),completed=missions.filter(m=>done.has(m.id)),xp=completed.reduce((n,m)=>n+m.xp,0)+Object.keys(me.hours).length*100+(me.master?500:0),hours=Object.keys(me.hours).length,pct=Math.round(100*hours/7),next=modules.findIndex((_,i)=>unlocked(i+1)&&!me.hours[i+1])+1||7;layout(`<section class="dash"><div class="topline"><div><div class="eyebrow">YOUR WORKSPACE</div><h1>Welcome, ${esc(me.name)}.</h1></div><div class="actions"><button class="btn ghost" onclick="tour(0)">DEMO TOUR</button><button class="btn" onclick="lesson(${next})">CONTINUE LEARNING</button></div></div><div class="grid"><div class="card"><div class="eyebrow">7-HOUR WORKSHOP</div><h2>${pct}% complete</h2><div class="progress"><i style="width:${pct}%"></i></div><p class="hint">The next hour stays locked until the preceding hour's notes, verified practice, and daily mock are complete.</p>${modules.map((m,i)=>{let n=i+1,open=unlocked(n);return`<div class="module ${open?'mission':''}" ${open?`onclick="lesson(${n})"`:''}><span class="num">${me.hours[n]?'DONE':open?`H${n}`:'LOCKED'}</span><div><b>${m[1]}</b><br><small>${me.hours[n]?'Notes · practice · mock complete':open?'Notes · solved example · practice · daily mock':'Complete Hour '+(n-1)+' first'}</small></div></div>`}).join('')}</div><div><div class="stats"><div class="metric"><b>${xp}</b><small>XP earned</small></div><div class="metric"><b>${hours}/7</b><small>Hours complete</small></div></div><div class="card" style="margin-top:10px"><div class="eyebrow">DBMS COMMANDS GAME</div><h3>10 MCQS Spin Wheel</h3><p class="hint">Spin to draw an unanswered DBMS command question. Answers are checked from the question bank.</p><button class="btn" onclick="wheelGame()">PLAY SPIN WHEEL</button></div><div class="card" style="margin-top:10px"><div class="eyebrow">ACHIEVEMENTS</div><h3>Badge & certificate gallery</h3><p class="hint">Preview achievement designs. Downloads unlock only from completed work.</p><button class="btn ghost" onclick="showcase()">VIEW READ-ONLY GALLERY</button></div><div class="card" style="margin-top:10px"><div class="eyebrow">CERTIFICATION</div><h3>${me.master?'MASTER ASSESSMENT PASSED':'MASTER ASSESSMENT'}</h3><p class="hint">Complete all 7 hours, then score 70% or more across 50 MCQs to unlock your certificate.</p><button class="btn ${hours===7?'':'ghost'}" ${hours===7?'':'disabled'} onclick="master()">${me.master?'VIEW CERTIFICATE':'START 50 MCQS'}</button>${me.master?` <button class="btn ghost" onclick="downloadCertificatePng()">DOWNLOAD CERTIFICATE PNG</button><button class="btn ghost" onclick="downloadCertificatePdf()">DOWNLOAD CERTIFICATE PDF</button>`:''}</div></div></div></section>`)}
function task(n){ensure();return me.tasks[n]??={notes:false,practice:false}}function lesson(n){ensure();if(!unlocked(n))return dashboard();let u=units[n-1],pass=me.hours[n],t=task(n);save();layout(`<section class="dash"><button class="btn ghost" onclick="dashboard()">← DASHBOARD</button><section class="card" style="margin-top:16px"><div class="eyebrow">HOUR ${n} · ${modules[n-1][1].toUpperCase()}</div><h1>${u[0]}</h1><h3>Simple notes ${t.notes?'✓':''}</h3><p class="hint">${u[1]}</p><button class="btn ghost" onclick="markNotes(${n})">${t.notes?'NOTES COMPLETED':'MARK NOTES COMPLETE'}</button><h3>Solved example</h3><pre class="terminal" style="padding:14px">${esc(u[2])}</pre><h3>Verified practice ${t.practice?'✓':''}</h3><p class="hint">${u[3]} Run the supplied task query. Completion is recorded only when it executes successfully.</p><textarea id="hourSql" class="editor" style="min-height:90px">${esc(u[2])}</textarea><div class="actions"><button class="btn ghost" onclick="verifyPractice(${n})">VERIFY PRACTICE QUERY</button><button class="btn" ${t.notes&&t.practice?'':'disabled'} onclick="dailyMock(${n})">${pass?'RETAKE DAILY MOCK':'TAKE DAILY MOCK'}</button>${pass?`<button class="btn ghost" onclick="downloadBadgePng(${n})">DOWNLOAD HOUR ${n} BADGE PNG</button><button class="btn ghost" onclick="downloadBadgePdf(${n})">DOWNLOAD HOUR ${n} BADGE PDF</button>`:''}</div><p id="practiceStatus" class="hint"></p></section></section>`)}function markNotes(n){task(n).notes=true;save();lesson(n)}function verifyPractice(n){try{let rows=execute(document.querySelector('#hourSql').value);if(!rows.length&&n!==4)throw Error('The query ran but returned no practice result.');task(n).practice=true;save();practiceStatus.textContent=`Practice verified: ${rows.length} row(s) returned. Your daily mock is now available.`;setTimeout(()=>lesson(n),500)}catch(e){practiceStatus.textContent=e.message}}
function showcase(){ensure();layout(`<section class="dash"><button class="btn ghost" onclick="dashboard()">← DASHBOARD</button><section class="card" style="margin-top:16px"><div class="eyebrow">READ-ONLY ACHIEVEMENT GALLERY</div><h1>Your future proof of work.</h1><div class="features" style="padding:20px 0"><div class="feature"><strong>HOUR BADGE</strong><p>Earned after notes, verified practice and an hourly mock.</p></div><div class="feature"><strong>MASTER BADGE</strong><p>Earned after the 50 MCQ assessment.</p></div><div class="feature"><strong>CERTIFICATE</strong><p>Unlocks only after all seven hours and master pass.</p></div></div><p class="hint">These are previews only. Learner records cannot be edited from this gallery.</p></section></section>`)}function tour(step){let slides=[['Welcome','Enter your name to create a local learner profile. Your work is stored only on this device.'],['Learn one hour at a time','Every hour has simple notes, a solved example and a practice task.'],['Prove the practice','Run the practice query. The next action unlocks only after it produces a valid result.'],['Pass the daily mock','Score at least 70% on the 5-question hour mock to earn an hour badge.'],['Finish with proof','Complete all seven hours, then pass the 50 MCQ master assessment to unlock the certificate.']];let s=slides[step];layout(`<section class="auth card"><div class="eyebrow">PORTAL TOUR · ${step+1}/${slides.length}</div><h2>${s[0]}</h2><p class="hint">${s[1]}</p><div class="actions">${step?'<button class="btn ghost" onclick="tour('+(step-1)+')">BACK</button>':''}${step<slides.length-1?'<button class="btn" onclick="tour('+(step+1)+')">NEXT</button>':'<button class="btn" onclick="dashboard()">OPEN DASHBOARD</button>'}</div></section>`)}
function wheelGame(){ensure();me.wheel??={asked:[],correct:0};save();wheelScreen()}function wheelScreen(){let w=me.wheel,done=w.asked.length;layout(`<section class="dash"><button class="btn ghost" onclick="dashboard()">← DASHBOARD</button><section class="card" style="margin-top:16px"><div class="eyebrow">DBMS COMMANDS · 10 MCQS GAME</div><h1>Spin. Answer. Master the commands.</h1><div class="wheel-wrap"><div class="pointer">▼</div><div class="wheel" id="wheel"></div><p class="hint">${done}/10 answered · ${w.correct} correct</p><button class="btn" ${done===10?'disabled':''} onclick="spinWheel()">${done===10?'GAME COMPLETE':'SPIN THE WHEEL'}</button></div><section id="wheelQuestion" class="card" style="margin-top:18px"><div class="empty">Spin to draw your next unanswered DBMS command question.</div></section></section></section>`)}function spinWheel(){let available=Array.from({length:10},(_,i)=>i).filter(i=>!me.wheel.asked.includes(i));if(!available.length)return;let pick=available[Math.floor(Math.random()*available.length)],rotation=720+Math.floor(Math.random()*720);wheel.style.transform=`rotate(${rotation}deg)`;setTimeout(()=>{let q=rawQuestions[pick];wheelQuestion.innerHTML=`<div class="eyebrow">QUESTION ${me.wheel.asked.length+1}/10</div><h3>${esc(q.q)}</h3>${q.options.map((o,i)=>`<label class="option"><input type="radio" name="wheelAnswer" value="${i}"> ${esc(o)}</label>`).join('')}<button class="btn" onclick="answerWheel(${pick})">LOCK ANSWER</button><p id="wheelResult" class="hint"></p>`},850)}function answerWheel(index){let chosen=document.querySelector('input[name=wheelAnswer]:checked');if(!chosen)return wheelResult.textContent='Choose one answer first.';let correct=+chosen.value===rawQuestions[index].answer;me.wheel.asked.push(index);if(correct)me.wheel.correct++;save();wheelResult.innerHTML=correct?'<b style="color:var(--gold)">Correct. Nice command knowledge.</b>':'Not quite. The correct command is saved in the learning notes.';setTimeout(wheelScreen,900)}
function dailyMock(n){let qs=rawQuestions.slice((n-1)*5,n*5);assessment(`HOUR ${n} DAILY MOCK`,qs,`gradeHour(${n},${qs.length})`)}function assessment(title,qs,handler){layout(`<section class="dash"><button class="btn ghost" onclick="dashboard()">← DASHBOARD</button><section class="card" style="margin-top:16px"><div class="eyebrow">ASSESSMENT</div><h1>${title}</h1><p class="hint">Answer every question. A score of 70% is required to pass.</p><form id="quiz">${qs.map((x,i)=>`<div class="module" style="display:block"><b>${i+1}. ${esc(x.q)}</b>${x.options.map((o,j)=>`<label class="hint" style="display:block;margin-top:9px"><input type="radio" name="q${i}" value="${j}"> ${esc(o)}</label>`).join('')}</div>`).join('')}<button type="button" class="btn" onclick="${handler}">SUBMIT ASSESSMENT</button><p id="grade" class="hint"></p></form></section></section>`)}
function score(count){let result=0;for(let i=0;i<count;i++){let chosen=document.querySelector(`input[name=q${i}]:checked`);if(chosen&&+chosen.value===rawQuestions[window.qStart+i].answer)result++}return result}function gradeHour(n,count){ensure();let t=task(n);if(!t.notes||!t.practice)return grade.textContent='Complete the notes and verified practice before taking this mock.';window.qStart=(n-1)*5;let result=score(count),passed=result/count>=.7;if(passed)me.hours[n]={score:result,total:count,completedAt:new Date().toISOString()};save();grade.innerHTML=passed?`<b style="color:var(--gold)">HOUR COMPLETE. ${result}/${count}</b><br>Your badge is ready to download.`:`You scored ${result}/${count}. Review the notes and try again.`;if(passed)grade.innerHTML+=` <button class="btn ghost" onclick="downloadBadgePng(${n})">DOWNLOAD BADGE PNG</button><button class="btn ghost" onclick="downloadBadgePdf(${n})">DOWNLOAD BADGE PDF</button>`}
function master(){ensure();if(Object.keys(me.hours).length!==7)return dashboard();if(me.master)return downloadCertificate();window.qStart=0;assessment('50 MCQS MASTER ASSESSMENT',rawQuestions,'gradeMaster(50)')}function gradeMaster(count){ensure();if(Object.keys(me.hours).length!==7)return grade.textContent='Complete all seven hours first.';let result=score(count),passed=result/count>=.7;if(passed)me.master={score:result,total:count,completedAt:new Date().toISOString()};save();grade.innerHTML=passed?`<b style="color:var(--gold)">CERTIFICATION UNLOCKED. ${result}/${count}</b><br><button class="btn" onclick="downloadCertificatePng()">DOWNLOAD CERTIFICATE PNG</button><button class="btn ghost" onclick="downloadCertificatePdf()">DOWNLOAD CERTIFICATE PDF</button>`:`You scored ${result}/${count}. You need at least 35/50. Review and retake when ready.`}
function downloadAsset(filename,blob){let a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}function svgToCanvas(svg,width,height){return new Promise((resolve,reject)=>{let blob=new Blob([svg],{type:'image/svg+xml;charset=utf-8'}),url=URL.createObjectURL(blob),img=new Image;img.onload=()=>{let c=document.createElement('canvas');c.width=width;c.height=height;let x=c.getContext('2d');x.fillStyle='#ffffff';x.fillRect(0,0,width,height);x.drawImage(img,0,0,width,height);URL.revokeObjectURL(url);resolve(c)};img.onerror=reject;img.src=url})}function canvasPng(canvas){return new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('PNG generation failed')),'image/png'))}function canvasJpeg(canvas){return new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('JPEG generation failed')),'image/jpeg',0.95))}function bytes(blob){return blob.arrayBuffer().then(b=>new Uint8Array(b))}async function canvasPdf(canvas){
let jpeg=await canvasJpeg(canvas),
data=new Uint8Array(await jpeg.arrayBuffer()),
w=canvas.width,
h=canvas.height,
enc=new TextEncoder(),
NL=String.fromCharCode(10),
chunks=[],
offset=0,
offsets=[0];

function addText(s){
let b=enc.encode(s);
chunks.push(b);
offset+=b.length;
}

function addBytes(b){
chunks.push(b);
offset+=b.length;
}

function addObject(n,body){
offsets[n]=offset;
addText(n+' 0 obj'+NL+body+NL+'endobj'+NL);
}

addText('%PDF-1.4'+NL);

let content=
'q'+NL+
w+' 0 0 '+h+' 0 0 cm'+NL+
'/Im0 Do'+NL+
'Q'+NL;

addObject(1,
'<< /Type /Catalog /Pages 2 0 R >>'
);

addObject(2,
'<< /Type /Pages /Kids [3 0 R] /Count 1 >>'
);

addObject(3,
'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 '+w+' '+h+'] /Resources << /XObject << /Im0 5 0 R >> >> /Contents 4 0 R >>'
);

addObject(4,
'<< /Length '+enc.encode(content).length+' >>'+NL+
'stream'+NL+
content+
'endstream'
);

offsets[5]=offset;

addText(
'5 0 obj'+NL+
'<< /Type /XObject /Subtype /Image /Width '+w+
' /Height '+h+
' /ColorSpace /DeviceRGB /BitsPerComponent 8'+
' /Filter /DCTDecode /Length '+data.length+' >>'+NL+
'stream'+NL
);

addBytes(data);

addText(
NL+
'endstream'+NL+
'endobj'+NL
);

let xrefOffset=offset;

addText(
'xref'+NL+
'0 6'+NL+
'0000000000 65535 f '+NL
);

for(let i=1;i<=5;i++){
addText(
String(offsets[i]).padStart(10,'0')+
' 00000 n '+NL
);
}

addText(
'trailer'+NL+
'<< /Size 6 /Root 1 0 R >>'+NL+
'startxref'+NL+
xrefOffset+NL+
'%%EOF'
);

return new Blob(chunks,{type:'application/pdf'});
}
function badgeSvg(n,name){return`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#0b0b0c"/><rect x="28" y="28" width="1144" height="574" rx="28" fill="#121213" stroke="#d6ac52" stroke-width="4"/><circle cx="600" cy="252" r="142" fill="#d6ac52"/><text x="600" y="220" text-anchor="middle" font-family="Arial,sans-serif" font-size="31" font-weight="700" fill="#17130c">ZERO-TO-</text><text x="600" y="260" text-anchor="middle" font-family="Arial,sans-serif" font-size="31" font-weight="700" fill="#17130c">INFINITY</text><text x="600" y="307" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" font-weight="700" fill="#17130c">HOUR ${n} COMPLETE</text><text x="600" y="458" text-anchor="middle" font-family="Arial,sans-serif" font-size="25" letter-spacing="4" fill="#d6ac52">DBMS + SQL WORKSHOP</text><line x1="205" y1="490" x2="995" y2="490" stroke="#3c3525"/><text x="600" y="544" text-anchor="middle" font-family="Arial,sans-serif" font-size="${Math.max(22,Math.min(32,900/Math.max(name.length,1)))}" font-weight="600" fill="#f5f1e8">AWARDED TO ${esc(name).toUpperCase()}</text></svg>`}function certificateSvg(name){return`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000"><rect width="1600" height="1000" fill="#f5f1e8"/><rect x="38" y="38" width="1524" height="924" fill="none" stroke="#d6ac52" stroke-width="12"/><text x="800" y="190" text-anchor="middle" font-family="Arial,sans-serif" font-size="50" font-weight="bold" fill="#17130c">ZERO-TO-INFINITY</text><text x="800" y="260" text-anchor="middle" font-family="Arial,sans-serif" font-size="35" fill="#6d5726">DBMS + SQL · CERTIFIED 7-HOUR WORKSHOP</text><text x="800" y="410" text-anchor="middle" font-family="Arial,sans-serif" font-size="34" fill="#222">This certifies that</text><text x="800" y="510" text-anchor="middle" textLength="1240" lengthAdjust="spacingAndGlyphs" font-family="Arial,sans-serif" font-size="70" font-weight="bold" fill="#17130c">${esc(name)}</text><text x="800" y="600" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" fill="#222">has completed seven learning hours and passed the 50 MCQ master assessment.</text><text x="800" y="760" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" fill="#6d5726">10% THEORY · 90% HANDS-ON · Powered by Kapil</text><text x="800" y="845" text-anchor="middle" font-family="Arial,sans-serif" font-size="23" fill="#222">Issued ${new Date().toLocaleDateString()}</text></svg>`}async function downloadBadgePng(n){ensure();if(!me.hours[n])return;try{let c=await svgToCanvas(badgeSvg(n,me.name),1200,630),b=await canvasPng(c);downloadAsset(`ZTI-hour-${n}-badge.png`,b)}catch(e){console.error(e);alert('Badge PNG generation failed.')}}async function downloadBadgePdf(n){ensure();if(!me.hours[n])return;try{let c=await svgToCanvas(badgeSvg(n,me.name),1200,630),b=await canvasPdf(c);downloadAsset(`ZTI-hour-${n}-badge.pdf`,b)}catch(e){console.error(e);alert('Badge PDF generation failed.')}}async function downloadCertificatePng(){ensure();if(!me.master)return;try{let c=await svgToCanvas(certificateSvg(me.name),1600,1000),b=await canvasPng(c);downloadAsset('ZERO-TO-INFINITY-DBMS-SQL-Level-1-Certificate.png',b)}catch(e){console.error(e);alert('Certificate PNG generation failed.')}}async function downloadCertificatePdf(){ensure();if(!me.master)return;try{let c=await svgToCanvas(certificateSvg(me.name),1600,1000),b=await canvasPdf(c);downloadAsset('ZERO-TO-INFINITY-DBMS-SQL-Level-1-Certificate.pdf',b)}catch(e){console.error(e);alert('Certificate PDF generation failed.')}}function downloadBadge(n){downloadBadgePng(n)}function downloadCertificate(){downloadCertificatePng()}function openMission(id){active=missions.find(m=>m.id===id);layout(`<section class="ide"><aside class="sidebar"><div class="eyebrow">ACTIVE MISSION</div><h2>${esc(active.title)}</h2><p class="hint">${esc(active.objective)}</p><button class="btn ghost" onclick="hint.hidden=!hint.hidden">REVEAL HINT</button><p class="hint" id="hint" hidden>${esc(active.hint)}</p><hr><div class="eyebrow">DATABASE EXPLORER</div>${Object.entries(db).map(([name,rows])=>`<div class="module"><div><b>${name}</b><br><small>${Object.keys(rows[0]).join(' · ')}</small></div></div>`).join('')}<button class="btn ghost" onclick="dashboard()" style="margin-top:15px">← DASHBOARD</button></aside><main><div class="eyebrow">BROWSER SQL WORKSPACE · ${active.id.toUpperCase()}</div><textarea class="editor" id="sql">SELECT *
FROM students;</textarea><div class="toolbar"><span class="status" id="status">Write SQL, then run it against the workshop dataset.</span><div><button class="btn ghost" onclick="sql.value='SELECT * FROM students;'">RESET</button> <button class="btn" onclick="run()">RUN QUERY</button> <button class="btn" onclick="submit()">SUBMIT</button></div></div><section class="card result" id="result"><div class="empty">Query output will appear here.</div></section></main></section>`)}
function execute(sql){let m=sql.trim().replace(/;$/,'').match(/^select\s+(.+?)\s+from\s+(students|courses|enrollments|assessments)(?:\s+where\s+(\w+)\s*(=|>=|>|<=|<)\s*(?:'([^']*)'|(\d+)))?$/i);if(!m)throw Error('Use SELECT with one workshop table and an optional WHERE condition.');let[,columns,table,field,op,str,num]=m,rows=[...db[table]];if(field){let val=str??Number(num);rows=rows.filter(r=>{let a=r[field];if(a===undefined)throw Error('That column does not exist.');return op==='='?String(a)===String(val):op==='>'?a>val:op==='>='?a>=val:op==='<'?a<val:a<=val})}if(/^count\(\*\)/i.test(columns)){let alias=(columns.match(/\s+as\s+(\w+)/i)||[])[1]||'COUNT(*)';return[{[alias]:rows.length}]}if(columns!=='*'){let keys=columns.split(',').map(x=>x.trim());rows=rows.map(r=>Object.fromEntries(keys.map(k=>{if(!(k in r))throw Error('That column does not exist.');return[k,r[k]]})))}return rows}
function table(rows){let cols=rows[0]?Object.keys(rows[0]):[];return rows.length?`<table class="table"><thead><tr>${cols.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${cols.map(c=>`<td>${esc(r[c])}</td>`).join('')}</tr>`).join('')}</tbody></table>`:'<div class="empty">No matching rows.</div>'}function run(){try{let rows=execute(sql.value);status.textContent=`${rows.length} row(s) returned from the workshop dataset.`;result.innerHTML=table(rows)}catch(e){status.textContent=e.message}}function submit(){try{let rows=execute(sql.value),passed=active.check(rows);me.attempts.push({mission:active.id,sql:sql.value,passed,at:new Date().toISOString()});if(passed&&!me.done.includes(active.id))me.done.push(active.id);save();status.textContent=passed?'Mission complete. Strong work.':'Not quite. Your result does not match the mission yet.';if(passed)result.innerHTML=`<div class="empty"><b style="color:var(--gold)">MISSION COMPLETE. 🔥</b><p>Verified XP and progress were saved on this device.</p><button class="btn" onclick="dashboard()">RETURN TO DASHBOARD</button></div>`}catch(e){status.textContent=e.message}}(me?dashboard:landing)();
