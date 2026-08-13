# Local Democratic Information Infrastructure Stack

This repo is a living resource to help individuals and civic tech organizations find their place in the stack and encourage collaboration to reduce duplicated efforts.

Thank you to [@alexrosen](https://github.com/alexrosen) of SeeGov for initiating this idea and supplying the groundwork for the initial design.

Contributions are very welcome. Please see our [Contributing guide](#contributing--issue-tracking).

## Table of Contents

- [Scope](#scope)
- [Contributing & Issue Tracking](#contributing--issue-tracking)
  - [Reporting Issues](#reporting-issues)
  - [Creating a Branch & PR](#creating-a-branch--pr)
  - [Branch Naming Convention](#branch-naming-convention)
  - [Example Workflow](#example-workflow)
- [Adding/Editing Projects](#addingeditingremoving-projects)
- [Notes Section](#notes-section)
- [Build Instructions](#build-instructions)

---

## Scope {#scope}

The stack covers projects and products with meaningful local-government or local-election use in the United States that make local democracy information usable for public-interest purposes. This includes candidate and ballot information, and tools that help residents communicate with representatives.

**Excluded:**
- Tools built primarily to monitor government for private commercial advantage
- General local activist groups
- General-purpose engagement or consultation platforms sold to governments

**Included:** Scaled engagement infrastructure that helps residents use and act on local democracy information.

**Layer 1 note:** Illustrative rather than comprehensive. Include foundational reference data and major providers with broad U.S. local-government use; put narrower Layer 1 providers in the Notes section.

---

## Contributing & Issue Tracking {#contributing--issue-tracking}

### Reporting Issues {#reporting-issues}

1. **Create an issue** describing the change needed
   - Use a clear, descriptive title
   - Include context and rationale
   - Reference related issues if applicable
   - Issues are where changes are debated and consensus is reached before raising a PR

2. **Note the issue number** (e.g., `#10`)

### Creating a Branch & PR {#creating-a-branch--pr}

3. **Create a branch** with the issue number in the name:
   ```bash
   git checkout -b data/issue-#10-expand-local-democracy-stack
   ```
   
   Or for feature work:
   ```bash
   git checkout -b feature/#15-add-new-layer
   ```
   
   Or for follow-up work:
   ```bash
   git checkout -b hotfix/issue-#10-expand-local-democracy-stack
   ```

4. **Make your changes** and commit with meaningful messages:
   ```bash
   git commit -m "Closes #10: Remove inactive projects from active stack"
   ```

5. **Push to your branch:**
   ```bash
   git push origin data/issue-#10-expand-local-democracy-stack
   ```

6. **Create a Pull Request** linking to the issue:
   - Title: Reference the issue — `Closes #10: Comprehensive stack review`
   - Description: Include `Closes #10` or `Fixes #10` to auto-link and auto-close the issue when merged

### Branch Naming Convention {#branch-naming-convention}

Use one of these patterns:
- `data/#<issue-number>-<description>` — Data changes
- `feature/#<issue-number>-<description>` — New features
- `fix/#<issue-number>-<description>` — Bug fixes
- `docs/#<issue-number>-<description>` — Documentation updates

### Example Workflow {#example-workflow}

```bash
# Issue #10: Expand local democracy stack
git checkout -b data/issue-#10-expand-democracy-stack
# ...make changes...
git commit -m "Closes #10: Remove inactive projects; adjust placements"
git push origin data/issue-#10-expand-democracy-stack
# Create PR with title: "Closes #10: Comprehensive stack review"
```

When you merge, GitHub will automatically close issue #10.

---

## Adding/Editing/Removing Projects {#addingeditingremoving-projects} 

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

**Notes:**
- Open-source projects are eligible
- The `type` field describes the organization responsible for the project, not its software license
- Use `nonprofit` or `commercial` rather than `open-source`
- All PRs are automatically validated for JSON formatting and required fields

---

## Notes Section {#notes-section}

Projects that currently focus on a single metro area or a small number of locations belong in the `notes` section at the end of `docs/data.json`, not in Layers 1–5. 

**Include in your entry:**
- Explanation of the project's geographic focus in the `note` field
- Relevant Layer 1 category if narrower than full Layer 1 scope

These entries are displayed below the stack and are excluded from the stack overview totals.

---

## Build Instructions {#build-instructions}

This is a GitHub Pages site. To view locally:

1. **Navigate to the docs folder:**
   ```bash
   cd docs
   ```

2. **Serve the site** (using Python):
   ```bash
   python3 -m http.server 8000
   ```

3. **View the site:**
   Open your browser and navigate to `http://localhost:8000`

4. **Deploy:**
   Push to `main` or `gh-pages`, and GitHub Pages will automatically deploy the site.

---

**Questions?** [Open an issue](../../issues/new) or reach out to the maintainers.
