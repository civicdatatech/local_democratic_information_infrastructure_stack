//// filepath: /Users/virginiadooley/Documents/civicdataproject/docs/app.js
(function(){
  const root = document.getElementById('map-root');

  function escapeHtml(s){
    return String(s)
      .replaceAll('&','&amp;')
      .replaceAll('<','&lt;')
      .replaceAll('>','&gt;');
  }

  function makeEl(tag, props = {}, children = []) {
    const el = document.createElement(tag);
    for (const k in props) {
      if (k === 'class') el.className = props[k];
      else if (k === 'html') el.innerHTML = props[k];
      else el.setAttribute(k, props[k]);
    }
    for (const c of children) {
      if (typeof c === 'string') el.appendChild(document.createTextNode(c));
      else if (c) el.appendChild(c);
    }
    return el;
  }

  function renderError(msg){
    root.innerHTML = '';
    const p = makeEl('p', { class: 'loading' }, [msg]);
    root.appendChild(p);
  }

  fetch('./docs/data.json', { cache: 'no-store' })
    .then(resp => {
      if (!resp.ok) throw new Error('Failed to load data.json');
      return resp.json();
    })
    .then(data => {
      root.innerHTML = '';

      if (!data.categories || !Array.isArray(data.categories) || data.categories.length === 0) {
        renderError('No categories found in data.json');
        return;
      }

      const categories = data.categories.slice().sort((a,b) => b.level_number - a.level_number);

      categories.forEach(layer => {
        const layerEl = makeEl('section', { class: 'layer', 'data-layer-id': layer.id });

        const header = makeEl('div', { class: 'layer-header' });
        header.appendChild(makeEl('div', { class: 'level-num' }, [String(layer.level_number)]));
        const titleWrap = makeEl('div', {});
        titleWrap.appendChild(makeEl('h2', { class: 'layer-title' }, [layer.name]));
        if (layer.description) titleWrap.appendChild(makeEl('div', { class: 'layer-desc' }, [layer.description]));
        header.appendChild(titleWrap);
        layerEl.appendChild(header);

        const grid = makeEl('div', { class: 'layer-grid' });

        if (!layer.categories || layer.categories.length === 0) {
          grid.appendChild(makeEl('div', { class: 'empty' }, ['No categories defined']));
        } else {
          layer.categories.forEach(cat => {
            const col = makeEl('div', { class: 'category' });
            col.appendChild(makeEl('h3', {}, [cat.name]));

            const itemsWrap = makeEl('div', { class: 'items' });

            if (!cat.items || cat.items.length === 0) {
              itemsWrap.appendChild(makeEl('div', { class: 'empty' }, ['No projects']));
            } else {
              cat.items.forEach(item => {
                const typeClass = (item.type === 'commercial') ? 'type-commercial' : 'type-nonprofit';
                const card = makeEl('button', { class: `card ${typeClass}`, title: `${item.product_name} — ${item.organization}` });
                card.setAttribute('aria-label', `${item.product_name} by ${item.organization}`);
                card.setAttribute('type','button');

                card.addEventListener('click', () => {
                  if (item.url) window.open(item.url, '_blank', 'noopener');
                });
                card.addEventListener('keydown', (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (item.url) window.open(item.url, '_blank', 'noopener');
                  }
                });

                const badge = makeEl('span', { class: 'badge' });
                const product = makeEl('div', { class: 'product' }, [
                  badge,
                  escapeHtml(item.product_name)
                ]);
                const org = makeEl('div', { class: 'org' }, [escapeHtml(item.organization || '')]);

                product.style.display = 'flex';
                product.style.alignItems = 'center';
                product.style.gap = '8px';

                const badgeNode = product.querySelector('.badge');
                product.removeChild(badgeNode);
                product.insertBefore(badgeNode, product.firstChild);

                card.appendChild(product);
                if (item.organization) card.appendChild(org);

                itemsWrap.appendChild(card);
              });
            }

            col.appendChild(itemsWrap);
            grid.appendChild(col);
          });
        }

        layerEl.appendChild(grid);
        root.appendChild(layerEl);
      });

    })
    .catch(err => {
      console.error(err);
      renderError('Unable to load the ecosystem map. Ensure data.json is present and valid.');
    });

})();