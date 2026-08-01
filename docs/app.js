fetch('data.json')
  .then(response => response.json())
  .then(levels => {
    const mapRoot = document.getElementById('map-root');
    mapRoot.innerHTML = ''; // Clear loading message

    levels.forEach(level => {
      const levelDiv = document.createElement('section');
      levelDiv.className = 'level';
      levelDiv.innerHTML = `
        <h2>${level.name}</h2>
        <p>${level.description}</p>
      `;

      const categoriesDiv = document.createElement('div');
      categoriesDiv.className = 'categories';

      level.categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';
        categoryDiv.innerHTML = `<h3>${category.name}</h3>`;

        const itemsList = document.createElement('div');
        itemsList.className = 'items';

        category.items.forEach(item => {
          const itemDiv = document.createElement('div');
          itemDiv.className = 'item';
          itemDiv.innerHTML = `
            <a href="${item.url}" target="_blank" rel="noopener">
              <strong>${item.product_name}</strong><br>
              ${item.organization} (${item.type})
            </a>
          `;
          itemsList.appendChild(itemDiv);
        });

        categoryDiv.appendChild(itemsList);
        categoriesDiv.appendChild(categoryDiv);
      });

      levelDiv.appendChild(categoriesDiv);
      mapRoot.appendChild(levelDiv);
    });
  })
  .catch(error => {
    console.error('Error loading data.json:', error);
    document.getElementById('map-root').innerHTML = '<p class="error">Unable to load ecosystem map. Ensure data.json is present and valid.</p>';
  });