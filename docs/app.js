let allData = [];
let layoutFrameId = null;

function updateCategoryScrollState(categoriesGrid) {
  const hasOverflow = categoriesGrid.scrollWidth > categoriesGrid.clientWidth + 1;
  const hasMoreContent = hasOverflow && (
    categoriesGrid.scrollLeft + categoriesGrid.clientWidth < categoriesGrid.scrollWidth - 1
  );

  categoriesGrid.classList.toggle('is-scrollable', hasOverflow);
  categoriesGrid.classList.toggle('has-overflow-end', hasMoreContent);

  if (hasOverflow) {
    categoriesGrid.setAttribute('tabindex', '0');
  } else {
    categoriesGrid.removeAttribute('tabindex');
  }
}

function updateCategoryScrollStates() {
  document.querySelectorAll('.categories').forEach(updateCategoryScrollState);
}

function refreshLayout() {
  if (layoutFrameId !== null) {
    window.cancelAnimationFrame(layoutFrameId);
  }

  layoutFrameId = window.requestAnimationFrame(() => {
    updateCategoryScrollStates();
    drawConnectors();
    layoutFrameId = null;
  });
}

function updateStats() {
  const enabledTypes = new Set();

  document.querySelectorAll('.filter-checkbox:checked').forEach(checkbox => {
    enabledTypes.add(checkbox.value);
  });

  const items = allData.flatMap(layer => 
    layer.categories.flatMap(cat => 
      cat.items.filter(item => enabledTypes.has(item.type))
    )
  );

  const stats = {
    total: items.length,
    nonprofit: items.filter(i => i.type === 'nonprofit').length,
    commercial: items.filter(i => i.type === 'commercial').length
  };

  document.getElementById('total-items').textContent = stats.total;
  document.getElementById('total-nonprofit').textContent = stats.nonprofit;
  document.getElementById('total-commercial').textContent = stats.commercial;
}

function applyFilters() {
  const typeFilters = new Set();

  document.querySelectorAll('.filter-checkbox:checked').forEach(checkbox => {
    typeFilters.add(checkbox.value);
  });

  document.querySelectorAll('.item, .note-entry').forEach(itemEl => {
    const type = itemEl.getAttribute('data-type');
    const isVisible = typeFilters.has(type);
    
    itemEl.classList.toggle('hidden', !isVisible);
  });

  updateStats();
  refreshLayout();
}

function renderNotes(noteSections, container) {
  noteSections.forEach(section => {
    const notesDiv = document.createElement('section');
    notesDiv.className = 'stack-notes';
    notesDiv.id = section.id;
    notesDiv.innerHTML = `
      <h2>${section.name}</h2>
      <p>${section.description}</p>
    `;

    section.categories.forEach(category => {
      const noteGroup = document.createElement('div');
      noteGroup.className = 'note-group';

      if (section.categories.length > 1) {
        noteGroup.innerHTML = `<h3>${category.name}</h3>`;
      }

      const notesList = document.createElement('ul');
      notesList.className = 'note-list';

      if (category.items.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.className = 'category-empty';
        emptyMessage.textContent = 'TBD — suggestions welcome';
        notesList.appendChild(emptyMessage);
      }

      category.items.forEach(item => {
        const noteItem = document.createElement('li');
        noteItem.className = 'note-entry';
        noteItem.setAttribute('data-type', item.type.toLowerCase());
        noteItem.innerHTML = `
          <a href="${item.url}" target="_blank" rel="noopener" aria-label="${item.product_name} by ${item.organization}, ${item.type}">
            <strong>${item.product_name}</strong>
          </a>
          <span class="item-note">${item.note}</span>
        `;
        notesList.appendChild(noteItem);
      });

      noteGroup.appendChild(notesList);
      notesDiv.appendChild(noteGroup);
    });

    container.appendChild(notesDiv);
  });
}

function renderLayers(layers, noteSections) {
  const container = document.getElementById('layers-container');
  container.innerHTML = '';

  layers.forEach(layer => {
    const layerDiv = document.createElement('section');
    layerDiv.className = 'layer';
    layerDiv.id = layer.id;
    layerDiv.innerHTML = `
      <h2>${layer.name}</h2>
      <p>${layer.description}</p>
    `;

    const categoriesDiv = document.createElement('div');
    categoriesDiv.className = 'categories';
    categoriesDiv.setAttribute('aria-label', `${layer.name} categories`);
    categoriesDiv.setAttribute('role', 'region');
    categoriesDiv.addEventListener('scroll', () => {
      updateCategoryScrollState(categoriesDiv);
    }, { passive: true });

    layer.categories.forEach(category => {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'category';
      categoryDiv.innerHTML = `<h3>${category.name}</h3>`;

      const itemsList = document.createElement('div');
      itemsList.className = 'items';

      if (category.items.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'category-empty';
        emptyMessage.textContent = 'TBD — suggestions welcome';
        itemsList.appendChild(emptyMessage);
      }

      category.items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.setAttribute('data-type', item.type.toLowerCase());
        
        itemDiv.innerHTML = `
          <a href="${item.url}" target="_blank" rel="noopener" aria-label="${item.product_name} by ${item.organization}, ${item.type}">
            <strong>${item.product_name}</strong>
            <div class="item-org">${item.organization}</div>
          </a>
        `;
        itemsList.appendChild(itemDiv);
      });

      categoryDiv.appendChild(itemsList);
      categoriesDiv.appendChild(categoryDiv);
    });

    layerDiv.appendChild(categoriesDiv);
    container.appendChild(layerDiv);
  });

  renderNotes(noteSections, container);

  updateStats();
  refreshLayout();
}

function drawConnectors() {
  const svg = document.getElementById('connectors-svg');
  svg.innerHTML = '';

  const layers = document.querySelectorAll('.layer');
  
  layers.forEach((layer, idx) => {
    if (idx < layers.length - 1) {
      const nextLayer = layers[idx + 1];
      
      const currentItems = layer.querySelectorAll('.item:not(.hidden)');
      const nextItems = nextLayer.querySelectorAll('.item:not(.hidden)');
      
      if (currentItems.length > 0 && nextItems.length > 0) {
        const currentRect = layer.getBoundingClientRect();
        const nextRect = nextLayer.getBoundingClientRect();
        
        const y1 = currentRect.bottom - document.querySelector('.visualization-wrapper').getBoundingClientRect().top;
        const y2 = nextRect.top - document.querySelector('.visualization-wrapper').getBoundingClientRect().top;
        
        const x = currentRect.left + currentRect.width / 2;
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', '#ddd');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('stroke-dasharray', '5,5');
        
        svg.appendChild(line);
      }
    }
  });
}

fetch('data.json')
  .then(response => response.json())
  .then(entries => {
    allData = entries.filter(entry => !entry.is_notes);
    const noteSections = entries.filter(entry => entry.is_notes);
    renderLayers(allData, noteSections);
  })
  .catch(error => {
    console.error('Error loading data.json:', error);
    document.getElementById('layers-container').innerHTML = '<p class="error">Unable to load ecosystem map. Ensure data.json is present and valid.</p>';
  });

document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', applyFilters);
});

document.getElementById('reset-filters').addEventListener('click', () => {
  document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
    checkbox.checked = true;
  });
  applyFilters();
});

window.addEventListener('resize', refreshLayout);
