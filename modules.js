const MODULES = [
  {
    id: "00",
    name: "Foundations, browser only",
    month: "August 2026",
    deliverable: "This tracker, built and deployed on GitHub Pages",
    resources: [
      {
        id: "00-r1",
        name: "Odin Project Foundations — the projects only",
        url: "https://www.theodinproject.com/paths/foundations",
        description: "Skip the sections on how computers and the internet work. Build the calculator and etch-a-sketch cold, from an empty file, with no help. Generating code is a different skill from reading it.",
        plannedHours: 10
      },
      {
        id: "00-r2",
        name: "javascript.info — language fundamentals",
        url: "https://javascript.info",
        description: "Start at 2.10 Functions. Then ch. 4 Objects, ch. 5.5 Array methods, ch. 6.3 Closures. Skip 2.1-2.9, that is C control flow in different syntax.",
        plannedHours: 20
      },
      {
        id: "00-r2b",
        name: "javascript.info — Document and Events",
        url: "https://javascript.info/document",
        description: "Part 2, chapters 1 and 2. The DOM, event bubbling, delegation. This is the browser, not the language, and it is the gap that makes wireEvents hard to read.",
        plannedHours: 6
      },
      {
        id: "00-r3",
        name: "Git and GitHub from the browser",
        url: "https://www.theodinproject.com",
        description: "Commits, history, GitHub Pages. Using github.dev, nothing installed locally. Branching comes in module 01 once there is a terminal.",
        plannedHours: 1
      },
      {
        id: "00-r4",
        name: "Markdown and technical documentation",
        url: "https://www.markdownguide.org",
        description: "READMEs, specifications, working conventions. Documentation is half the engineering.",
        plannedHours: 2
      },
      {
        id: "00-r5",
        name: "Automate the Boring Stuff — ch. 1-6, in Colab",
        url: "https://automatetheboringstuff.com/2e/chapter1/",
        description: "Move fast through ch. 2-3, they are C control flow. Slow down on ch. 4 Lists and ch. 5 Dictionaries — those two carry the language. Paste each example into a Colab cell and run it.",
        plannedHours: 6
      },
      {
        id: "00-r6",
        name: "Python Tutor — visualising references",
        url: "https://pythontutor.com",
        description: "Step through code and watch variables change. Aimed at the C blind spot: b = a does not copy a list, both names point at the same one.",
        plannedHours: 2
      },
      {
        id: "00-r7",
        name: "Exercism — Python track, first ten exercises",
        url: "https://exercism.org/tracks/python",
        description: "Small problems with automatic tests. Writing from an empty file, not reading. The tests are the feedback that reading does not give.",
        plannedHours: 4
      }
    ]
  },

  {
    id: "01",
    name: "The working environment",
    month: "September 2026",
    deliverable: "A script that reads files, sends them to a model, and writes a useful result — in a virtualenv, on a branch, merged via pull request",
    resources: [
      {
        id: "01-r1",
        name: "Linux and the command line",
        url: "https://linuxjourney.com",
        description: "Filesystem, permissions, users, processes, systemd, SSH, pipes. Follow the RHCSA objectives as a syllabus without sitting the exam. Every container and every server you touch is Linux.",
        plannedHours: 16
      },
      {
        id: "01-r2",
        name: "Python environments and dependencies",
        url: "https://docs.astral.sh/uv/",
        description: "venv, requirements.txt, lockfiles, uv. Why pip install without an environment breaks things later. This is the first thing you hit on a new machine and nothing works without it.",
        plannedHours: 6
      },
      {
        id: "01-r3",
        name: "Git beyond commits",
        url: "https://learngitbranching.js.org",
        description: "Branches, merges, conflicts, pull requests, rebase, reading a diff. Committing to main is not the skill a job needs. Interactive and free.",
        plannedHours: 8
      },
      {
        id: "01-r4",
        name: "Automate the Boring Stuff — ch. 7-9, 12-18",
        url: "https://automatetheboringstuff.com",
        description: "Regex, files, Excel, PDFs, web scraping. The chapters that need a real filesystem, which is why they waited for the Mac.",
        plannedHours: 18
      },
      {
        id: "01-r5",
        name: "Python for Everybody — APIs and JSON",
        url: "https://www.py4e.com",
        description: "requests, JSON, HTTP status codes, pagination, rate limits. The foundation of everything that follows.",
        plannedHours: 10
      },
      {
        id: "01-r6",
        name: "pandas and tabular data",
        url: "https://pandas.pydata.org/docs/getting_started/",
        description: "Reading, cleaning and reshaping CSV and Excel data. Almost every automation touches a table.",
        plannedHours: 10
      },
      {
        id: "01-r7",
        name: "Anthropic Academy — Claude API course",
        url: "https://www.anthropic.com/learn",
        description: "Official API documentation structured as a course. Messages, system prompts, tool use, streaming.",
        plannedHours: 8
      },
      {
        id: "01-r8",
        name: "Prompt engineering for developers",
        url: "https://www.deeplearning.ai/short-courses/",
        description: "Talking to a model from code rather than from a chat window. Structured outputs, few-shot, when examples hurt.",
        plannedHours: 4
      }
    ]
  },

  {
    id: "02",
    name: "Automation and pipelines",
    month: "October 2026",
    deliverable: "Three working automations, one solving a real problem at work, one running on a schedule without a platform",
    resources: [
      {
        id: "02-r1",
        name: "n8n Academy — Level 1",
        url: "https://docs.n8n.io/courses/",
        description: "Official certified course. Open source, self-hostable, allows dropping into code.",
        plannedHours: 12
      },
      {
        id: "02-r2",
        name: "n8n Academy — Level 2",
        url: "https://docs.n8n.io/courses/",
        description: "Conditional logic, error handling, webhooks, retries. Your instinct for flags and state machines is an advantage here.",
        plannedHours: 12
      },
      {
        id: "02-r3",
        name: "AI nodes in n8n",
        url: "https://docs.n8n.io",
        description: "Models inside a workflow. Where module 01 and module 02 meet, and the exact hybrid profile that gets hired.",
        plannedHours: 10
      },
      {
        id: "02-r4",
        name: "GitHub Actions — CI and scheduled jobs",
        url: "https://docs.github.com/en/actions",
        description: "Cron, triggers, running tests on every push, secrets. Automation that needs no platform underneath it. Free on public repositories.",
        plannedHours: 10
      }
    ]
  },

  {
    id: "03",
    name: "First deployed app",
    month: "November 2026",
    deliverable: "A web app on a public URL that uses a model, handles failure gracefully, and has tests",
    resources: [
      {
        id: "03-r1",
        name: "Streamlit — official tutorial",
        url: "https://docs.streamlit.io/get-started",
        description: "Python into a web app without writing frontend code. The fastest route from script to something someone else can use.",
        plannedHours: 10
      },
      {
        id: "03-r2",
        name: "Async Python and concurrency",
        url: "https://docs.python.org/3/library/asyncio.html",
        description: "async/await, asyncio.gather vs as_completed, semaphores, closing clients. A standard live interview task is making 100 sequential LLM calls concurrent with a cap and per-request error handling. Learn it before agents need it.",
        plannedHours: 14
      },
      {
        id: "03-r3",
        name: "Error handling for API calls",
        url: "https://tenacity.readthedocs.io",
        description: "Retries with backoff, timeouts, rate limits, graceful degradation. The line between a demo and something a client can use.",
        plannedHours: 8
      },
      {
        id: "03-r4",
        name: "Testing with pytest",
        url: "https://docs.pytest.org",
        description: "Fixtures, mocking API calls, testing the deterministic parts. Starts here rather than in February, because untested code accumulates.",
        plannedHours: 10
      },
      {
        id: "03-r5",
        name: "Deployment, secrets and environment variables",
        url: "https://share.streamlit.io",
        description: "A public URL with API keys kept out of the repository. One leaked key on a public repo is a three-figure bill.",
        plannedHours: 6
      },
      {
        id: "03-r6",
        name: "Practical AI app bootcamp",
        url: "",
        description: "Udemy, in a sale. Structured build-along for a full app. Assess it before committing the hours — replace with an equivalent if it disappoints.",
        plannedHours: 12
      }
    ]
  },

  {
    id: "04",
    name: "Retrieval over your own data",
    month: "December 2026",
    deliverable: "A deployed assistant answering questions over real documents, with citations and a retrieval eval",
    resources: [
      {
        id: "04-r1",
        name: "LangChain for LLM application development",
        url: "https://www.deeplearning.ai/short-courses/",
        description: "Taught by the creator of LangChain. Chains, memory, document loaders.",
        plannedHours: 4
      },
      {
        id: "04-r2",
        name: "Embeddings and vector databases",
        url: "https://docs.trychroma.com",
        description: "ChromaDB locally. What an embedding is, why cosine similarity, when it fails. Managed vector stores come when someone is paying.",
        plannedHours: 8
      },
      {
        id: "04-r3",
        name: "Chunking and document preparation",
        url: "https://python.langchain.com",
        description: "Most bad RAG systems are chunking problems, not model problems. Overlap, metadata, structure-aware splitting.",
        plannedHours: 6
      },
      {
        id: "04-r4",
        name: "Hybrid search and reranking",
        url: "https://www.pinecone.io/learn/",
        description: "BM25 alongside vectors, cross-encoder reranking, when each wins. Naive RAG is table stakes; this is what separates a demo from something that survives messy data and ambiguous queries.",
        plannedHours: 12
      },
      {
        id: "04-r5",
        name: "SQL fundamentals",
        url: "https://sqlbolt.com",
        description: "SELECT, JOIN, GROUP BY, indexes. Needed for structured data, for retrieval over databases, and for the Supabase migration.",
        plannedHours: 10
      },
      {
        id: "04-r6",
        name: "Postgres and Supabase in practice",
        url: "https://supabase.com/docs",
        description: "Tables, migrations, auth, row-level security. Directly unblocks the v2 migration of the tracker.",
        plannedHours: 8
      }
    ]
  },

  {
    id: "05",
    name: "Agents and orchestration",
    month: "January 2027",
    deliverable: "An agent completing a multi-step task using at least two external tools, with concurrent calls and failure handling",
    resources: [
      {
        id: "05-r1",
        name: "Agentic AI — full course",
        url: "https://www.deeplearning.ai",
        description: "Framework-agnostic foundations. Planning, reflection, tool use, multi-agent patterns. Start here before touching any library.",
        plannedHours: 12
      },
      {
        id: "05-r2",
        name: "Hugging Face AI Agents Course",
        url: "https://huggingface.co/learn",
        description: "Hands-on, with a free certificate worth listing.",
        plannedHours: 14
      },
      {
        id: "05-r3",
        name: "Model Context Protocol",
        url: "https://www.anthropic.com/learn",
        description: "The standard for connecting models to external tools. Emerging in 2026, so early is an advantage.",
        plannedHours: 6
      },
      {
        id: "05-r4",
        name: "How language models actually work",
        url: "https://www.deeplearning.ai/short-courses/",
        description: "Tokens, embeddings, attention, context windows, why hallucination happens. Conceptual, not mathematical. This is what interviews probe when they ask why a system failed.",
        plannedHours: 8
      },
      {
        id: "05-r5",
        name: "Multi-provider routing and cost engineering",
        url: "https://docs.litellm.ai",
        description: "Routing by task, prompt caching economics, token accounting, fallbacks between providers. Single-provider lock-in is over and cost is a design constraint, not an afterthought.",
        plannedHours: 10
      },
      {
        id: "05-r6",
        name: "Agents inside n8n",
        url: "",
        description: "Udemy, in a sale. Joins module 02 and module 05: agents running in a workflow platform. The hybrid profile again.",
        plannedHours: 10
      }
    ]
  },

  {
    id: "06",
    name: "Evaluation and production reliability",
    month: "February 2027",
    deliverable: "One earlier project with an eval harness, a tracing setup, and a written failure analysis",
    resources: [
      {
        id: "06-r1",
        name: "Building and evaluating advanced RAG",
        url: "https://www.deeplearning.ai/short-courses/",
        description: "Retrieval metrics, groundedness, answer relevance. The evaluation half is what separates a demo from a product.",
        plannedHours: 8
      },
      {
        id: "06-r2",
        name: "Designing an eval harness from scratch",
        url: "https://github.com/openai/evals",
        description: "Build your own: golden dataset, metrics, regression runs on every change. Expect to be asked in every interview what eval you designed, what it measured, and what it caught. Having no answer marks you as someone who has never shipped.",
        plannedHours: 16
      },
      {
        id: "06-r3",
        name: "Tracing and observability",
        url: "https://langfuse.com/docs",
        description: "Langfuse or LangSmith. Logging every call, latency, token cost, failure rates. You cannot improve what you do not measure.",
        plannedHours: 10
      },
      {
        id: "06-r4",
        name: "Prompt injection and LLM security",
        url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
        description: "OWASP Top 10 for LLM applications. A real attack surface the moment a model touches untrusted input or has tools.",
        plannedHours: 8
      },
      {
        id: "06-r5",
        name: "Structured outputs and guardrails",
        url: "https://www.anthropic.com/learn",
        description: "Schema-constrained responses, validation, refusal handling, escape hatches in system prompts.",
        plannedHours: 6
      }
    ]
  },

  {
    id: "07",
    name: "Services, containers and the cloud",
    month: "March 2027",
    deliverable: "A containerised API serving an earlier project, deployed on AWS",
    resources: [
      {
        id: "07-r1",
        name: "FastAPI and REST design",
        url: "https://fastapi.tiangolo.com/tutorial/",
        description: "Building a service other things can call, not just an app people click. Async endpoints, dependency injection, request validation. This is what job descriptions mean by AI engineer.",
        plannedHours: 16
      },
      {
        id: "07-r2",
        name: "Docker fundamentals",
        url: "https://docs.docker.com/get-started/",
        description: "Images, layers, containers, compose, volumes. The answer to it works on my machine, and a frequent hard requirement.",
        plannedHours: 12
      },
      {
        id: "07-r3",
        name: "AWS core services",
        url: "https://aws.amazon.com/getting-started/",
        description: "IAM, S3, EC2, VPC basics, Lambda, ECS. AWS appears in roughly a third of AI engineering postings and dominates the Australian market.",
        plannedHours: 20
      },
      {
        id: "07-r4",
        name: "Deploy a containerised service to AWS",
        url: "https://docs.aws.amazon.com/",
        description: "From local container to a public endpoint with logs, environment variables and a cost alarm. Set the billing alert before anything else.",
        plannedHours: 10
      }
    ]
  },

  {
    id: "08",
    name: "AWS Solutions Architect Associate",
    month: "April 2027",
    deliverable: "SAA-C03 passed",
    resources: [
      {
        id: "08-r1",
        name: "Solutions Architect Associate — course",
        url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
        description: "Stephane Maarek on Udemy or Adrian Cantrill. Roughly $150 for the exam. The credential that gets a career-changer past a recruiter screen.",
        plannedHours: 35
      },
      {
        id: "08-r2",
        name: "Practice exams and weak-area drilling",
        url: "https://portal.tutorialsdojo.com",
        description: "Tutorials Dojo. Sit full timed papers, find the weakest domains, drill those. Do not book the exam until you are consistently past 80 percent.",
        plannedHours: 15
      }
    ]
  },

  {
    id: "09",
    name: "One production-grade system",
    month: "May 2027",
    deliverable: "A single project taken to production quality, with metrics you can quote in an interview",
    resources: [
      {
        id: "09-r1",
        name: "Take one project to production",
        url: "",
        description: "Real auth, a real database, deployed on AWS, containerised, tested, traced, cost-controlled. Pick the industrial-domain one: 75 percent of AI postings now want domain specialisation, and electromechanical engineering is yours.",
        plannedHours: 40
      },
      {
        id: "09-r2",
        name: "Measure and write it up",
        url: "",
        description: "Latency, throughput, cost per request, eval scores before and after. Production metrics outrank framework names on a CV. This process took four hours, now it takes six minutes.",
        plannedHours: 10
      },
      {
        id: "09-r3",
        name: "AI system design practice",
        url: "https://github.com/donnemartin/system-design-primer",
        description: "Design a RAG system for a legal firm. Design an agent that books appointments. Sketch the architecture, name the failure modes, justify the model choice. This is the interview format for applied AI roles.",
        plannedHours: 12
      }
    ]
  }
];
