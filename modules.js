const MODULES = [
  {
    id: "00",
    name: "Foundations, browser only",
    month: "August–September 2026",
    deliverable: "This tracker, built and deployed on GitHub Pages",
    resources: [
      {
        id: "00-r1",
        name: "Odin Project Foundations — CSS, HTML, & First Webpages",
        url: "https://www.theodinproject.com/paths/foundations",
        description: "Learning the foundations of CSS and HTML and completing The Odin project up to Javascript ",
        plannedHours: 15
      },
      {
        id: "00-r2",
        name: "Learn Javascript fundamentals with javascript.info",
        url: "https://javascript.info",
        description: "All part 1, from basic to all data types tart at 2.10 Functions.",
        plannedHours: 20
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
        name: "Automate the Boring Stuff — ch. 1-8, in Colab",
        url: "https://automatetheboringstuff.com/3e/chapter1.html",
        description: "3rd edition. Move fast through ch. 2-3, they are C control flow. Slow down on ch. 6 Lists and ch. 7 Dictionaries — those two carry the language. Paste each example into a Colab cell and run it.",
        plannedHours: 6
      },
      {
        id: "00-r7",
        name: "Exercism — Python track, practice until feeling confortable solving easy problem",
        url: "https://exercism.org/tracks/python",
        description: "Small problems with automatic tests. Writing from an empty file, not reading. The tests are the feedback that reading does not give.",
        plannedHours: 6
      },
      {
        id: "00-r8",
        name: "Odin Project Foundations — Javascript & Projects",
        url: "https://www.theodinproject.com/paths/foundations",
        description: "Javascript sections and projects such as rock,paper,scissors, calculator and etch-a-sketch cold, from an empty file, all from scrath and no AI",
        plannedHours: 20
      },
    ]
  },

  {
    id: "01",
    name: "The working environment",
    month: "September–November 2026",
    deliverable: "A script that reads files, sends them to a model, and writes a useful result — in a virtualenv, on a branch, merged via pull request",
    resources: [
      {
        id: "01-r1",
        name: "Linux and the command line — basics only",
        url: "https://labex.io/linuxjourney",
        description: "Filesystem, permissions, processes, pipes and redirects — enough to be dangerous in a terminal. Skip the systemd, networking and SSH-server tracks here; they land naturally in module 07 when you are actually running a container on a remote box.",
        plannedHours: 6
      },
      {
        id: "01-r2",
        name: "Python environments and dependencies",
        url: "https://docs.astral.sh/uv/",
        description: "venv, requirements.txt, lockfiles, uv. Why pip install without an environment breaks things later. This is the first thing you hit on a new machine and nothing works without it.",
        plannedHours: 3
      },
      {
        id: "01-r3",
        name: "Git — branching and pull requests",
        url: "https://learngitbranching.js.org",
        description: "Just the introduction sequence: branch, merge, a pull request on GitHub. This module's own deliverable needs a branch and a PR, so that much can't wait for the job. Skip rebase and the advanced sequences — a real conflict on real work teaches those faster than a simulator does.",
        plannedHours: 3
      },
      {
        id: "01-r4",
        name: "Automate the Boring Stuff — ch. 9-13",
        url: "https://automatetheboringstuff.com/3e/chapter9.html",
        description: "3rd edition. Regex, files, organizing files,  web scraping. ",
        plannedHours: 18
      },
      {
        id: "01-r5",
        name: "Python for Everybody — ch. 14 Web Services and ch. 15 Objects",
        url: "https://www.py4e.com/lessons",
        description: "JSON and calling web APIs, then classes and objects — Automate the Boring Stuff never teaches classes, and every library from here on is built from them. The book fetches with urllib; write the exercises with requests instead, which you already met in the web scraping chapter.",
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
        id: "01-r9",
        name: "How language models work — AI capabilities and limitations",
        url: "https://academy.claude.com/courses/ai-capabilities-and-limitations",
        description: "Tokens, next-token prediction, context windows, why hallucination happens. Conceptual, not mathematical. Learned before building on models, not four months after.",
        plannedHours: 4
      },
      {
        id: "01-r7",
        name: "Anthropic Academy — Building with the Claude API",
        url: "https://anthropic.skilljar.com/",
        description: "Free, about 8-9h of video in total. Do the sections up to and including tool use: messages, system prompts, prompt engineering, prompt evaluation, structured output, tool use. The RAG, MCP and agent sections wait for modules 04 and 05.",
        plannedHours: 10
      }
    ]
  },

  {
    id: "02",
    name: "Automation and pipelines",
    month: "November–December 2026",
    deliverable: "Three working automations, one solving a real problem at work, one running on a schedule without a platform",
    resources: [
      {
        id: "02-r1",
        name: "n8n Academy — N8N101 Essentials",
        url: "https://learn.n8n.io/",
        description: "Free, with a badge. First workflows: triggers, nodes, data moving between them. Open source, self-hostable, allows dropping into code.",
        plannedHours: 4
      },
      {
        id: "02-r2",
        name: "n8n Academy — N8N102 Integrations",
        url: "https://learn.n8n.io/",
        description: "Free, with a badge. APIs, webhooks, conditional logic and error handling.",
        plannedHours: 5
      },
      {
        id: "02-r3",
        name: "n8n Academy — N8N103 AI, testing and best practices",
        url: "https://learn.n8n.io/",
        description: "Free, with a badge. Models and agents inside a workflow, and testing workflows before trusting them.",
        plannedHours: 5
      },
      {
        id: "02-r4",
        name: "GitHub Actions — CI and scheduled jobs",
        url: "https://docs.github.com/en/actions",
        description: "Cron, triggers, running tests on every push, secrets. Automation that needs no platform underneath it. Free on public repositories.",
        plannedHours: 10
      },
      {
        id: "02-r5",
        name: "Build — an automation that solves a real problem at work",
        url: "",
        description: "Pick something done by hand every week and remove it. n8n or Python, whichever fits. Measure the time it saves; that number goes on the CV.",
        plannedHours: 10
      },
      {
        id: "02-r6",
        name: "Build — an n8n workflow with a model in it",
        url: "",
        description: "A workflow where a model reads, classifies or drafts something, with error handling for when it fails or returns nonsense.",
        plannedHours: 10
      },
      {
        id: "02-r7",
        name: "Build — a scheduled job on GitHub Actions",
        url: "",
        description: "A Python script that runs on a schedule with no platform underneath it, secrets kept out of the repository.",
        plannedHours: 10
      }
    ]
  },

  {
    id: "03",
    name: "First deployed app",
    month: "January–February 2027",
    deliverable: "A FastAPI backend with a plain HTML, CSS and JavaScript front end, on a public URL, that uses a model, handles failure gracefully, and has tests",
    resources: [
      {
        id: "03-r1",
        name: "Streamlit — prototype first",
        url: "https://docs.streamlit.io/get-started",
        description: "Python into a web page without writing front-end code. Prototype this module's app in Streamlit first, then build it properly with FastAPI. Streamlit is how teams make internal demos and data tools; FastAPI is how a product serves a model.",
        plannedHours: 6
      },
      {
        id: "03-r7",
        name: "Pydantic and Python type hints",
        url: "https://pydantic.dev/docs/validation/latest/get-started/",
        description: "Type hints first, then models that validate data where it enters the program. FastAPI request bodies, structured model output and every agent framework are built on this.",
        plannedHours: 6
      },
      {
        id: "03-r8",
        name: "FastAPI and REST design",
        url: "https://fastapi.tiangolo.com/tutorial/",
        description: "Building a service other things can call, not just an app people click. Async endpoints, dependency injection, request validation. The front end is the HTML, CSS and JavaScript from module 00 — no framework.",
        plannedHours: 16
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
        description: "Retries with backoff, timeouts, rate limits, graceful degradation. The Claude SDK already retries some failures; learn what it covers and where your own handling starts. The line between a demo and something a client can use.",
        plannedHours: 3
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
        url: "https://fastapi.tiangolo.com/deployment/",
        description: "A public URL for the FastAPI app, with API keys kept out of the repository. One leaked key on a public repo is a three-figure bill.",
        plannedHours: 6
      }
    ]
  },

  {
    id: "04",
    name: "Retrieval over your own data",
    month: "February–March 2027",
    deliverable: "A deployed assistant answering questions over real documents, with citations and a retrieval eval",
    resources: [
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
        url: "https://docs.langchain.com",
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
      },
      {
        id: "04-r7",
        name: "Retrieval evaluation",
        url: "https://hamel.dev/notes/llm/rag/index.html",
        description: "Twenty to thirty real questions, each paired with the chunk that answers it. Measure recall@k and MRR, and rerun after every chunking or embedding change. This module's deliverable needs it, so it cannot wait for module 06.",
        plannedHours: 4
      }
    ]
  },

  {
    id: "05",
    name: "Agents and orchestration",
    month: "March–April 2027",
    deliverable: "An agent completing a multi-step task using at least two external tools, with concurrent calls and failure handling",
    resources: [
      {
        id: "05-r1",
        name: "Agentic AI — full course",
        url: "https://www.deeplearning.ai/courses/agentic-ai/",
        description: "Andrew Ng, about 10h of video plus labs. Patterns built from first principles before any framework: planning, reflection, tool use, multi-agent. Start here before touching any library.",
        plannedHours: 15
      },
      {
        id: "05-r2",
        name: "Hugging Face AI Agents Course",
        url: "https://huggingface.co/learn/agents-course/unit0/introduction",
        description: "Hands-on with smolagents, LlamaIndex and LangGraph — the frameworks job postings name. Free certificate, no deadline.",
        plannedHours: 18
      },
      {
        id: "05-r3",
        name: "Model Context Protocol",
        url: "https://anthropic.skilljar.com/",
        description: "Introduction to Model Context Protocol, then Advanced Topics if the agent needs them. The standard way to connect models to tools and data since 2025.",
        plannedHours: 6
      },
      {
        id: "05-r5",
        name: "Multi-provider routing and cost engineering",
        url: "https://docs.litellm.ai",
        description: "Routing by task, prompt caching economics, token accounting, fallbacks between providers. Single-provider lock-in is over and cost is a design constraint, not an afterthought.",
        plannedHours: 10
      }
    ]
  },

  {
    id: "06",
    name: "Evaluation and production reliability",
    month: "April–May 2027",
    deliverable: "One earlier project with an eval harness, a tracing setup, and a written failure analysis",
    resources: [
      {
        id: "06-r2",
        name: "Designing an eval harness from scratch",
        url: "https://hamel.dev/notes/llm/evals/",
        description: "Hamel Husain's free guides: error analysis first, then a golden dataset, metrics, LLM-as-judge validated against your own labels, and regression runs on every change. Expect to be asked in every interview what eval you designed, what it measured, and what it caught. Having no answer marks you as someone who has never shipped.",
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
        url: "https://genai.owasp.org/llm-top-10/",
        description: "OWASP Top 10 for LLM applications, 2025 edition. A real attack surface the moment a model touches untrusted input or has tools.",
        plannedHours: 8
      },
      {
        id: "06-r5",
        name: "Structured outputs and guardrails",
        url: "https://platform.claude.com/docs/en/build-with-claude/structured-outputs",
        description: "Schema-constrained responses, validation, refusal handling, escape hatches in system prompts.",
        plannedHours: 6
      }
    ]
  },

  {
    id: "07",
    name: "Containers and the cloud",
    month: "May–June 2027",
    deliverable: "The module 03 FastAPI app, containerised and deployed on AWS",
    resources: [
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
        description: "IAM, S3, EC2, VPC basics, Lambda, ECS. Cloud platforms appear in more than half of AI engineering postings; the concepts carry over between providers.",
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
    month: "June–July 2027",
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
    month: "July–August 2027",
    deliverable: "A single project taken to production quality, with metrics you can quote in an interview",
    resources: [
      {
        id: "09-r1",
        name: "Take one project to production",
        url: "",
        description: "Real auth, a real database, deployed on AWS, containerised, tested, traced, cost-controlled. Pick the industrial-domain one: electromechanical engineering is a specialisation most applicants do not have.",
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
