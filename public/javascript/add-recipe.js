async function recipeFormHandler(event) {
  event.preventDefault();

  const recipe_name = document.querySelector('#recipe-name');
  const description = document.querySelector('#recipe-description');
  const steps = document.querySelector('#recipe-steps');
  const ingredients = document.querySelector('#recipe-ingredients');
  const time = document.querySelector('#recipe-cook-time');
  const servings = document.querySelector('#recipe-servings');

  const response = await fetch('/recipe', {
    method: 'POST',
    body: JSON.stringify({
      recipe_name,
      description,
      steps,
      ingredients,
      time,
      servings
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    document.location.reload();
  } 
  else {
    alert(response.statusText);
  }
}