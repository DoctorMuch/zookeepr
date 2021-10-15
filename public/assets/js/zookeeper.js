const $zookeeperForm = document.querySelector('#zookeeper-form');
const $displayArea = document.querySelector('#display-area');

const printResults = resultArr => {

  const animalHTML = resultArr.map(({ id, name, age, favoriteAnimal }) => {
    return `
  <div class="col-12 col-md-5 mb-3">
    <div class="card p-3" data-id=${id}>
      <h4 class="text-primary">${name}</h4>
      <p>Age: ${age}<br/>
      Favorite Animal: ${favoriteAnimal.substring(0, 1).toUpperCase() +
        favoriteAnimal.substring(1)}<br/>
      </p>
    </div>
  </div>
    `;
  });

  $displayArea.innerHTML = animalHTML.join('');
};

const getZookeepers = (formData = {}) => {
  let queryUrl = '/api/zookeepers?';

  Object.entries(formData).forEach(([key, value]) => {
    queryUrl += `${key}=${value}&`;
  });
  console.log(queryUrl);

  fetch(queryUrl)
    .then(response => {
      if (!response.ok) {
        return alert(`Error: ${response.statusText}`);
      }
      return response.json();
    })
    .then(zookeeperData => {
      console.log(zookeeperData);
      printResults(zookeeperData);
    });
};

const handleGetZookeepersSubmit = event => {
  event.preventDefault();
  const keeperNameHTML = $zookeeperForm.querySelector('[name="name"]');
  const name = keeperNameHTML.value;

  const keeperAgeHTML = $zookeeperForm.querySelector('[name= "age"]');
  const age = keeperAgeHTML.value;

  const keeperObj = { name, age };

  getZookeepers(keeperObj);
};

$zookeeperForm.addEventListener('submit', handleGetZookeepersSubmit);

getZookeepers();
