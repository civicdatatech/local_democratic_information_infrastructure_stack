fetch('data.json')
  .then(response => response.json())
  .then(layers => {
    const mapRoot = document.getElementById('map-root');
    mapRoot.innerHTML = ''; // Clear loading message

    layers.forEach(layer => {
      const layerDiv = document.createElement('section');
      layerDiv.className = 'layer';
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

        category.items.forEach(item => {
          const itemDiv = document.createElement('div');
          itemDiv.className = 'item';
          itemDiv.setAttribute('data-type', item.type.toLowerCase());
          
          itemDiv.innerHTML = `
            <a href="${item.url}" target="_blank" rel="noopener">
              <strong>${item.product_name}</strong>
              <div class="item-org">${item.organization}</div>
              <div class="item-type">${item.type}</div>
            </a>
          `;
          itemsList.appendChild(itemDiv);
        });

        categoryDiv.appendChild(itemsList);
        categoriesDiv.appendChild(categoryDiv);
      });

      layerDiv.appendChild(categoriesDiv);
      mapRoot.appendChild(layerDiv);
    });
  })
  .catch(error => {
    console.error('Error loading data.json:', error);
    document.getElementById('map-root').innerHTML = '<p class="error">Unable to load ecosystem map. Ensure data.json is present and valid.</p>';
  });