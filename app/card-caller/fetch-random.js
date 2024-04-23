export async function fetchRandomCard() {
  let card = null;

  while (!card) {
    console.log(`Fetching a random card`);
    const response = await fetch(
      `https://api.magicthegathering.io/v1/cards?random=true&pageSize=1`
    );

    if (response.ok) {
      const data = await response.json();
      if (data.cards && data.cards.length > 0) {
        card = data.cards[0];
      } else {
        console.log("Card not found, retrying...");
      }
    } else {
      console.log("Error fetching card, retrying...");
    }
  }

  return card;
}
