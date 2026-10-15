import{a as e,i as t,n,r,t as i}from"./index-xaVUP5GM.js";var a={name:`Recipe Box (sample)`,created:`2026-10-01`,updated:`2026-10-09`,problem:`Home cooks keep recipes in screenshots, bookmarks and paper cards, so when it is time to plan the week they cannot find what they want or turn it into a shopping list.`,repo:``,localPath:``,done:[`discover:problem-statement`,`discover:target-users`,`discover:jobs-to-be-done`,`discover:existing-alternatives`,`discover:success-metrics`,`discover:constraints`,`define:mvp-scope`,`define:user-stories`,`define:acceptance-criteria`,`define:out-of-scope`,`design:user-flows`,`design:wireframes-prototypes`]},o=`# Recipe Box: Problem Brief

**Phase 1 · Discover.** A sample project that shows what a finished brief looks like.

## Problem statement

> Home cooks keep recipes in screenshots, bookmarks and paper cards, so when it's time to plan the week they can't find what they want or turn it into a shopping list.

## Target users

| | Who | Context |
|---|---|---|
| **Primary** | The weeknight planner | Cooks 4–5 nights a week for a household and plans on Sunday |
| **Secondary** | The collector | Saves far more recipes than they cook and wants to actually use them |

## Jobs to be done

1. **When I find a recipe online**, I want to save it in one place so I can find it again.
2. **When I plan the week**, I want to pick meals quickly so planning takes minutes, not an hour.
3. **When I go shopping**, I want one combined list so I don't forget ingredients.

## Existing alternatives

| Today | Where it falls short |
|---|---|
| Screenshots and bookmarks | Can't search ingredients; no list |
| Notes app | Manual copy and paste; no structure |
| Big recipe sites | Only their own recipes, lots of ads |

## Success metrics

- Recipes saved per user in the first week (target: 10+)
- % of weeks with a plan made (target: 60%)

## Constraints

Solo developer working with an AI agent, about two weekends of work. Web first, mobile-friendly. No paid services.
`,s=`# Recipe Box: MVP Spec

**Phase 2 · Define.** What version 1 does, and what it doesn't.

## MVP scope

| Must | Should | Won't (yet) |
|---|---|---|
| Save a recipe from a link or by typing it | Tag recipes (quick, vegetarian…) | Meal-plan sharing |
| Plan 7 dinners for the week | Scale servings | Nutrition data |
| Generate one combined shopping list | Search by ingredient | Native mobile apps |

## User stories and acceptance criteria

**1. Save a recipe.** As a cook, I want to paste a recipe link so it's saved with its ingredients.

- Given a link to a recipe page, when I paste it, then the title, ingredients and steps are saved.
- Given a page with no recipe on it, when I paste it, then I'm told what went wrong and can type the recipe instead.

**2. Plan the week.** As a planner, I want to drag recipes onto days so the week is set.

- Given saved recipes, when I drop one on Tuesday, then Tuesday shows it and the list updates.
- Given an empty day, then it shows "Nothing planned" with a button to pick a recipe.

**3. Shopping list.** As a shopper, I want one list for the week so I buy everything in one trip.

- Given two recipes that both need onions, then the list shows one line with the combined amount.

## Out of scope

Accounts and syncing between devices, pantry tracking, and ordering groceries online.
`,c=`bm-demo-v1`,l=Object.assign({"/demo/recipe-box/project.json":a}),u=Object.assign({"/demo/recipe-box/problem-brief.md":o,"/demo/recipe-box/spec.md":s}),d=()=>new Date().toISOString().slice(0,10),f=(e,t)=>(e.match(/^#\s+(.+)$/m)?.[1]??t.replace(/\.md$/,``)).trim();function p(){let e={};for(let[t,n]of Object.entries(u)){let[,,r,i]=t.split(`/`);(e[r]??={})[i]=n}return{version:1,projects:Object.entries(l).map(([e,t])=>({...t,slug:e.split(`/`)[2]})),docs:e}}function m(a){let o=s();function s(){try{let e=JSON.parse(a?.getItem(c)??`null`);if(e?.version===1&&Array.isArray(e.projects))return e}catch{}return p()}function l(){try{a?.setItem(c,JSON.stringify(o))}catch{}}let u=e=>({...e,docs:Object.entries(o.docs[e.slug]??{}).map(([e,t])=>({file:e,title:f(t,e)})).sort((e,t)=>e.file.localeCompare(t.file))});function m(e){let t=o.projects.find(t=>t.slug===e);if(!t)throw Error(`No project called "${e}".`);return t}return{list:()=>o.projects.map(u),create(e){let r=e.name.trim();if(!r)throw Error(`A project needs a name.`);let a=t(r),s=a;for(let e=2;o.projects.some(e=>e.slug===s);e++)s=`${a}-${e}`;let c={slug:s,name:r,created:d(),updated:d(),problem:e.problem.trim(),repo:e.repo.trim(),localPath:e.localPath.trim(),done:[]};return o={...o,projects:[...o.projects,c],docs:{...o.docs,[s]:{"problem-brief.md":n(r,i.phases)}}},l(),u(c)},update(t,n){let a={...m(t)};for(let e of[`name`,`problem`,`repo`,`localPath`])typeof n[e]==`string`&&(a[e]=n[e].trim());if(!a.name)throw Error(`A project needs a name.`);if(n.done){let t=e(i.phases,n.done);if(t.length)throw Error(`Unknown checklist keys: ${t.join(`, `)}`);a.done=r(i.phases,n.done)}return a.updated=d(),o={...o,projects:o.projects.map(e=>e.slug===t?a:e)},l(),u(a)},doc(e,t){let n=o.docs[e]?.[t];if(n==null)throw Error(`That document isn't in this demo.`);return n},reset(){o=p();try{a?.removeItem(c)}catch{}}}}export{m as createDemoStore};