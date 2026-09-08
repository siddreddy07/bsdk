# Generate Complete Website Knowledge for RAG

Study the entire codebase and understand the website from the perspective of someone visiting and using it.

Do not modify any code.

Generate one structured Markdown document containing the verified knowledge an AI assistant would need to accurately help visitors of this website.

The assistant using this document will NOT have access to the codebase. The document must therefore preserve the useful knowledge available across the website while remaining concise and retrieval-friendly.

## Core principle

First determine what kind of website/product this is.

Do NOT assume it is:
- a developer tool
- SaaS
- an SDK
- e-commerce
- a business website
- documentation
- or any other specific category

Adapt the knowledge document to what actually exists.

For example:

- E-commerce → products, categories, pricing, variants, shipping, returns, ordering, account flows.
- Restaurant → menu, location, hours, reservations, dietary information, contact details.
- Hotel → rooms, amenities, policies, booking, check-in/out, location.
- Healthcare → services, practitioners, appointments, locations, patient information.
- University → programs, admissions, fees, departments, deadlines, campus information.
- Agency/business → services, process, portfolio, pricing if available, contact/booking.
- SaaS → features, plans, onboarding, workflows, account/settings, integrations.
- Developer product → installation, SDKs, APIs, packages, configuration, code examples.
- Documentation site → concepts, guides, references, examples, troubleshooting.
- Marketplace → listings, buyers/sellers, transactions, policies, account workflows.

These are examples only. Discover the actual website type from the codebase.

## Source of truth

Inspect all relevant visitor-facing information available in the repository:

- page content
- navigation and routes
- products or services
- features
- pricing
- plans
- policies
- FAQs
- forms
- user actions and workflows
- authentication/account flows
- locations
- contact information
- opening/business hours
- booking/reservation flows
- checkout/purchase flows
- search/filter behavior
- dashboard/account functionality
- documentation
- integrations
- public APIs/SDKs when they actually exist
- requirements and limits
- public errors/troubleshooting
- established internal and external links

Use implementation details only when necessary to establish actual user-facing behavior.

Never invent information because websites of this type normally have it.

If something cannot be established, do not manufacture an answer.

## What to capture

Capture everything a visitor could reasonably ask the website's assistant about.

This may include:

### Identity
- What is this website/business/product?
- What does it offer?
- Who is it for?
- What are its important concepts or terminology?

### Offerings
Extract the actual relevant entities for this website, such as:
- products
- services
- plans
- programs
- rooms
- menu items
- treatments
- courses
- features
- listings
- packages
- resources

For each, preserve useful established details such as price, availability, requirements, options, descriptions, restrictions, or relevant destinations.

### User actions and workflows
Identify what visitors can actually do.

Examples:
- sign up / log in
- buy
- book
- reserve
- contact
- request a quote
- apply
- subscribe
- upload
- search
- configure
- create
- manage an account
- cancel
- return
- download
- integrate

For each meaningful workflow capture:

**Goal → requirements → essential steps → result → relevant destination**

Only include steps established by the website.

### Rules and practical information
Capture when available:
- pricing
- eligibility
- requirements
- limits
- policies
- shipping
- returns/refunds
- cancellation
- availability
- opening hours
- locations
- contact methods
- deadlines
- payment information
- account requirements
- privacy/security guidance
- other important restrictions

### Technical/developer information
ONLY if this website actually exposes developer functionality, capture:
- installation
- packages
- SDKs
- APIs
- CLI commands
- public methods/components
- configuration
- environment variables
- integrations
- code examples
- request/response behavior
- technical requirements

Do not create developer sections for ordinary websites.

## Links and destinations

Links are important knowledge.

Whenever the website has a relevant destination, keep it with the information it supports.

Examples:

**Go here:** [Book an appointment](EXACT_URL)

**Go here:** [View pricing](EXACT_URL)

**Go here:** [Browse products](EXACT_URL)

**Go here:** [Read installation guide](EXACT_URL)

Use verified routes/URLs only.

Never guess or construct URLs.

Prefer descriptive Markdown links rather than raw URLs.

Do not put every link into one unrelated link dump.

## RAG structure

This document will be chunked and embedded into a vector database.

Optimize for retrieval.

Use:

**specific user-intent heading → concise factual answer → necessary details → relevant action/link**

Each section should:
- focus on one primary question, entity, feature, or action
- be understandable if retrieved independently
- use words a visitor is likely to search for
- contain enough context to identify what it refers to
- keep related links with the relevant information
- keep necessary code/configuration with technical sections

Prefer headings such as:

## What does <business/product> offer?
## <Service Name>
## How do I book an appointment?
## Where is <business> located?
## What are the opening hours?
## <Product Name>
## What is the return policy?
## How do I create an account?
## What does <Feature> do?
## How do I install <Package>?

The headings must adapt to the actual website.

Avoid meaningless headings such as:
- Other
- Miscellaneous
- General Information
- Technical Information

## Answerable user intents

Think about the questions a real visitor might ask after opening this website.

Create compact knowledge sections for important intents that the website can actually answer:

- What is this?
- What do you offer?
- How does this work?
- How much does it cost?
- Which option is right for me?
- Where can I find X?
- How do I do X?
- Can I do X?
- What are the requirements?
- What are your policies?
- Where are you located?
- How do I contact/book/buy/apply?
- Why isn't X working?

Adapt these to the website.

Do not create questions whose answers are not supported.

## Information density

Be comprehensive in coverage, but concise in writing.

Do not turn the output into a long-form manual.

Remove:
- marketing filler
- repeated explanations
- introductions
- conclusions
- generic advice
- decorative language
- unnecessary examples
- unnecessary tables
- internal implementation commentary

Every section should provide useful retrievable knowledge.

## Accuracy

Preserve exact:
- names
- prices
- dates
- limits
- terminology
- routes
- URLs
- policies
- commands
- configuration
- other factual values

Do not silently "improve" or normalize established facts.

If sources conflict and the current behavior does not resolve the conflict, state the conflict rather than guessing.

## Internal implementation

Do NOT document:
- repository structure
- internal components
- private functions
- database schemas
- internal services
- implementation architecture
- development notes

unless that information is genuinely required for a visitor or public user to use the website.

## Output

Generate exactly ONE Markdown document.

Do not generate PDF or HTML.
Do not explain your extraction process.
Do not provide a repository/file inventory.
Do not add commentary before or after the document.

The resulting Markdown should allow an AI assistant with no access to the original codebase to:

1. understand what the website is,
2. understand what it offers,
3. answer visitor questions,
4. explain relevant products/services/features,
5. guide supported user actions,
6. explain pricing, requirements, policies, and limits when available,
7. troubleshoot established problems,
8. provide technical help when the website actually has a developer surface,
9. and direct visitors to the correct verified page or action.

Never invent missing website-specific information.