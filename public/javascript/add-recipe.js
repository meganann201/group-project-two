async function recipeFormHandler(event) {
  event.preventDefault();

  const recipe_name = document.querySelector('input[name="recipe-name"]').value;
  const description = document.querySelector('#recipe-description').value;
  const steps = document.querySelector('#recipe-steps').value;
  const ingredients = document.querySelector('#recipe-ingredients').value;
  const time = document.querySelector('#recipe-cook-time').value;
  const servings = document.querySelector('#recipe-servings').value;

  const response = await fetch('/api/recipes', {
    method: 'POST',
    body: JSON.stringify({
      recipe_name,
      description,
      steps,
      ingredients,
      time,
      servings,
      image
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