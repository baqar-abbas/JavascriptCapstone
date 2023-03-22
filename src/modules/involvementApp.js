const postLike = async (itemId) => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/mfcv5DOSxch5uyyxzNLo/likes/', {
    method: 'POST',
    body: JSON.stringify({
      item_id: itemId,
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  return response.text();
};

const getLikes = async () => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/mfcv5DOSxch5uyyxzNLo/likes/');
  const data = await response.json();
  return data;
};

export { postLike, getLikes };