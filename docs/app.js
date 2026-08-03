let allData = [];
let filteredIndices = new Set();

function updateStats() {
  const items = allData.flatMap(layer => 
    layer.categories.flatMap(cat => 
      cat.items.filter((_, idx) => filteredIndices.has(`${layer.id}-${cat.name}-${idx}`))
    )
  );

  const stats = {
    total: items.length,
    nonprofit: items.filter(i => i.type === 'nonprofit').length,
    commercial: items.filter(i => i.type === 'commercial').length
  };

  document.getElementById('total-projects').textContent = stats.total;
  document.getElementById('total-nonprofit').textContent = stats.nonprofit;
  document.getElementById('total-commercial').textContent = stats.commercial;
}

function applyFilters() {
  const typeFilters = new Set();

  document.querySelectorAll('.filter-checkbox:checked').forEach(checkbox => {
    typeFilters.add(checkbox.value);
  });

  document.querySelectorAll('.item').forEach(itemEl => {
    const type = itemEl.getAttribute('data-type');
    const isVisible = typeFilters.has(type);
    
    itemEl.classList.toggle('hidden', !isVisible);
  });

  updateStats();
}

function renderLayers(layers) {
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

    layer.categories.forEach(category => {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'category';
      categoryDiv.innerHTML = `<h3>${category.name}</h3>`;

      const itemsList = document.createElement('div');
      itemsList.className = 'items';

      category.items.forEach((item, idx) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.setAttribute('data-type', item.type.toLowerCase());
        itemDiv.id = `${layer.id}-${category.name}-${idx}`;
        
        itemDiv.innerHTML = `
          <a href="${item.url}" target="_blank" rel="noopener">
            <strong>${item.product_name}</strong>
            <div class="item-org">${item.organization}</div>
            <div class="item-type">${item.type}</div>
          </a>
        `;
        itemsList.appendChild(itemDiv);
        filteredIndices.add(itemDiv.id);
      });

      categoryDiv.appendChild(itemsList);
      categoriesDiv.appendChild(categoryDiv);
    });

    layerDiv.appendChild(categoriesDiv);
    container.appendChild(layerDiv);
  });

  updateStats();
  drawConnectors();
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
  .then(layers => {
    allData = layers;
    renderLayers(layers);
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

window.addEventListener('resize', drawConnectors);