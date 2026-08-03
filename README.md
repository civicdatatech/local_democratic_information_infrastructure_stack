This repo is a living resource to help individuals and civic tech organizations find their place in the 'stack' and encourage collaboration within the stack. 

Thank you to Alex Rosen of SeeGov for initiating this idea and supplying the groundwork for the initial design. 

Contributions are very welcome. Please raise a PR to expand/suggest stack edits. To make changes directly using the Github UI: 

## To add/edit/remove a product/project: 

1. Open `docs/data.json`
2. Find the appropriate layer and category
3. Add/edit/remove an item following this format:
   ```json
   {
     "product_name": "Your Product Name",
     "organization": "Organization Name",
     "type": "nonprofit|commercial|open-source",
     "url": "https://example.com"
   }
   ```
4. Ensure your JSON is valid (no trailing commas, proper quotes)
5. Submit a pull request

**Note:** All PRs are automatically validated for JSON formatting and required fields. CI will catch any formatting errors.

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