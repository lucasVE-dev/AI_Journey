const MODULES = [
  {
    id: "00",
    name: "Foundations, browser only",
    month: "August 2026",
    deliverable: "This tracker, built and deployed on GitHub Pages",
    resources: [
      {
        id: "00-r1",
        name: "Odin Project Foundations — HTML, CSS, DOM",
        url: "https://www.theodinproject.com/paths/foundations",
        description: "Skip the opening sections on how computers and the internet work. The value is in the projects — build the calculator and etch-a-sketch cold, from an empty file, with no help.",
        plannedHours: 16
      },
      {
        id: "00-r2",
        name: "javascript.info — language fundamentals",
        url: "https://javascript.info",
        description: "Objects,Array methods, functions, the DOM, event bubbling, delegation...",
        plannedHours: 20
      },
      {
        id: "00-r3",
        name: "Git and GitHub from the browser",
        url: "https://www.theodinproject.com",
        description: "Commits, history, GitHub Pages. Using github.dev, nothing installed locally.",
        plannedHours: 4
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
    name: "Python that does something",
    month: "September 2026",
    deliverable: "A script that reads files, sends them to a model, and writes a useful result",
    resources: [
      {
        id: "01-r1",
        name: "Automate the Boring Stuff — ch. 1-6, 12-18",
        url: "https://automatetheboringstuff.com",
        description: "Python applied to files, Excel, PDFs and web scraping.",
        plannedHours: 20
      },
      {
        id: "01-r2",
        name: "Python for Everybody — APIs and JSON modules",
        url: "https://www.py4e.com",
        description: "requests, JSON, HTTP responses. The foundation of everything that follows.",
        plannedHours: 10
      },
      {
        id: "01-r3",
        name: "pandas and tabular data",
        url: "https://pandas.pydata.org/docs/getting_started/",
        description: "Reading, cleaning and reshaping CSV and Excel data. Almost every automation touches a table.",
        plannedHours: 10
      },
      {
        id: "01-r4",
        name: "ChatGPT Prompt Engineering for Developers",
        url: "https://www.deeplearning.ai/short-courses/",
        description: "Talking to a model from code rather than from a chat window.",
        plannedHours: 3
      },
      {
        id: "01-r5",
        name: "Command line and shell basics",
        url: "https://www.theodinproject.com",
        description: "Navigation, files, permissions, pipes. The Mac arrives this month and the terminal stops being optional.",
        plannedHours: 6
      },
      {
        id: "01-r6",
        name: "Anthropic Academy — Claude API course",
        url: "https://www.anthropic.com/learn",
        description: "Official API documentation structured as a course.",
        plannedHours: 8
      }
    ]
  },

  {
    id: "02",
    name: "No-code automation",
    month: "October 2026",
    deliverable: "Three working automations, one solving a real problem at work",
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
        description: "Conditional logic, error handling, webhooks.",
        plannedHours: 12
      },
      {
        id: "02-r3",
        name: "Make Academy — core path",
        url: "https://academy.make.com",
        description: "Second language of the sector. Many clients already run Make.",
        plannedHours: 10
      },
      {
        id: "02-r4",
        name: "AI nodes in n8n",
        url: "https://docs.n8n.io",
        description: "Models inside a workflow. Where module 01 and module 02 meet.",
        plannedHours: 10
      },
      {
        id: "02-r5",
        name: "GitHub Actions and scheduled jobs",
        url: "https://docs.github.com/en/actions",
        description: "Automation that runs without a platform behind it. Cron, triggers, CI. Free on public repositories.",
        plannedHours: 6
      }
    ]
  },

  {
    id: "03",
    name: "First deployed app",
    month: "November 2026",
    deliverable: "A web app on a public URL that uses a model to do something useful",
    resources: [
      {
        id: "03-r1",
        name: "Streamlit — official tutorial",
        url: "https://docs.streamlit.io/get-started",
        description: "Python into a web app without writing frontend code.",
        plannedHours: 10
      },
      {
        id: "03-r2",
        name: "7-Day Practical AI Bootcamp",
        url: "",
        description: "Udemy. Python, Streamlit, RAG and agents, all by building. Add URL once purchased.",
        plannedHours: 20
      },
      {
        id: "03-r3",
        name: "Deployment and environment variables",
        url: "https://share.streamlit.io",
        description: "A public URL, with API keys kept out of the repository.",
        plannedHours: 6
      },
      {
        id: "03-r4",
        name: "Error handling for API calls",
        url: "https://docs.python.org/3/tutorial/errors.html",
        description: "Retries, timeouts, rate limits, graceful failure. The line between a demo and something a client can use.",
        plannedHours: 8
      }
    ]
  },

  {
    id: "04",
    name: "RAG — AI over your own data",
    month: "December 2026",
    deliverable: "A deployed assistant answering questions over real documents, with citations",
    resources: [
      {
        id: "04-r1",
        name: "LangChain for LLM Application Development",
        url: "https://www.deeplearning.ai/short-courses/",
        description: "Taught by the creator of LangChain.",
        plannedHours: 4
      },
      {
        id: "04-r2",
        name: "Building and Evaluating Advanced RAG",
        url: "https://www.deeplearning.ai/short-courses/",
        description: "The evaluation half is what separates a demo from a product.",
        plannedHours: 6
      },
      {
        id: "04-r3",
        name: "Embeddings and vector databases",
        url: "https://docs.trychroma.com",
        description: "ChromaDB locally. Managed vector stores come when someone is paying.",
        plannedHours: 8
      },
      {
        id: "04-r4",
        name: "Chunking and document preparation",
        url: "https://python.langchain.com",
        description: "Most bad RAG systems are chunking problems, not model problems.",
        plannedHours: 6
      },
      {
        id: "04-r5",
        name: "SQL fundamentals",
        url: "https://sqlbolt.com",
        description: "SELECT, JOIN, GROUP BY. Needed for structured data and for the Supabase migration.",
        plannedHours: 10
      },
      {
        id: "04-r6",
        name: "Postgres and Supabase in practice",
        url: "https://supabase.com/docs",
        description: "Tables, rows, auth, row-level security. Directly unblocks the v2 migration of this tracker.",
        plannedHours: 8
      }
    ]
  },

  {
    id: "05",
    name: "Agents and orchestration",
    month: "January 2027",
    deliverable: "An agent completing a multi-step task using at least two external tools",
    resources: [
      {
        id: "05-r1",
        name: "Agentic AI — full course",
        url: "https://www.deeplearning.ai",
        description: "Framework-agnostic foundations. Start here before touching any library.",
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
        description: "The standard for connecting models to external tools. Early is an advantage.",
        plannedHours: 6
      },
      {
        id: "05-r4",
        name: "Agents in n8n with LangChain",
        url: "",
        description: "Udemy. Joins module 02 and module 05. Add URL once purchased.",
        plannedHours: 12
      },
      {
        id: "05-r5",
        name: "How language models actually work",
        url: "https://www.deeplearning.ai/short-courses/",
        description: "Tokens, embeddings, attention, context windows. Conceptual, not mathematical. This is what interviews probe.",
        plannedHours: 8
      }
    ]
  },

  {
    id: "06",
    name: "Production concerns",
    month: "February 2027",
    deliverable: "One earlier project hardened: tested, evaluated, cost-controlled",
    resources: [
      {
        id: "06-r1",
        name: "Prompt injection and LLM security",
        url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
        description: "OWASP Top 10 for LLM applications. A real attack surface, not a theoretical one.",
        plannedHours: 8
      },
      {
        id: "06-r2",
        name: "Evaluation and observability",
        url: "https://www.deeplearning.ai/short-courses/",
        description: "Tracing, logging and measuring model output. Knowing whether it works rather than assuming.",
        plannedHours: 8
      },
      {
        id: "06-r3",
        name: "Testing with pytest",
        url: "https://docs.pytest.org",
        description: "Enough to test the deterministic parts. Untested code is a liability you carry.",
        plannedHours: 10
      },
      {
        id: "06-r4",
        name: "Structured outputs and cost control",
        url: "https://www.anthropic.com/learn",
        description: "Schema-constrained responses, token accounting, choosing a model per task.",
        plannedHours: 6
      }
    ]
  },

  {
    id: "07",
    name: "Services and deployment",
    month: "March 2027",
    deliverable: "A containerised API serving one of the earlier projects",
    resources: [
      {
        id: "07-r1",
        name: "FastAPI and REST design",
        url: "https://fastapi.tiangolo.com/tutorial/",
        description: "Building a service other things can call, not just an app people click. This is what job descriptions mean by AI engineer.",
        plannedHours: 16
      },
      {
        id: "07-r2",
        name: "Async Python",
        url: "https://docs.python.org/3/library/asyncio.html",
        description: "async and await, concurrent requests. Unavoidable once an agent calls five tools that each take two seconds.",
        plannedHours: 8
      },
      {
        id: "07-r3",
        name: "Docker fundamentals",
        url: "https://docs.docker.com/get-started/",
        description: "Images, containers, compose. The answer to it works on my machine, and a common hard requirement.",
        plannedHours: 10
      },
      {
        id: "07-r4",
        name: "Deploy a containerised service",
        url: "https://fly.io/docs/",
        description: "From local container to a public URL with logs and environment variables.",
        plannedHours: 6
      }
    ]
  }
];
