This repo is a living resource to help individuals and civic tech organizations find their place in the 'stack' and encourage collaboration within the stack.

Thank you to @alexrosen of SeeGov for initiating this idea and supplying the groundwork for the initial design. 

Contributions are very welcome. Please raise a PR to expand/suggest stack edits. To make changes directly using the Github UI: 

## Scope

The stack covers projects and products with meaningful local-government or
local-election use in the United States that make local democratic information
usable for public-interest purposes. This includes candidate and ballot
information and tools that help residents communicate with representatives.
Exclude tools built primarily to monitor government for private commercial
advantage.

Layer 1 is illustrative rather than comprehensive. Include foundational
reference data and major providers with broad U.S. local-government use, and put
narrower Layer 1 providers in the Notes section.

## To add/edit/remove a product/project: 

1. Open `docs/data.json`
2. Find the appropriate layer and category
3. Add/edit/remove an item following this format:
   ```json
   {
     "product_name": "Your Product Name",
     "organization": "Organization Name",
     "type": "nonprofit|commercial",
     "url": "https://example.com"
   }
   ```
4. Ensure your JSON is valid (no trailing commas, proper quotes)
5. Submit a pull request

Open-source projects are eligible. The `type` field describes the organization
or community responsible for the project, not its software license, so use
`nonprofit` or `commercial` rather than an `open-source` category.

**Note:** All PRs are automatically validated for JSON formatting and required fields. CI will catch any formatting errors.

## Notes

Projects that currently focus on a single metro area or a small number of
locations belong in the `notes` section at the end of `docs/data.json`, not in
Layers 1–5. Explain the project's geographic focus in
its `note`. These entries are displayed below the stack and are excluded from
the stack overview totals.

The Notes section also documents narrower providers that would otherwise fit
Layer 1. State the relevant Layer 1 category in the entry's `note`.

## Build Instructions

This is a GitHub Pages site. To view locally:

1. **Navigate to the docs folder**:
   ```bash
   cd docs
   ```

2. **Serve the site** (using Python):
   ```bash
   python3 -m http.server 8000
   ```

3. **View the site**:
   Open your browser and navigate to `http://localhost:8000`

4. **Deploy**:
   Push to the `main` or `gh-pages` branch, and GitHub Pages will automatically deploy the site.
