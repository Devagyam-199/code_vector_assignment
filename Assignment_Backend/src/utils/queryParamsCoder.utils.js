const encodeParams = (createdAt, id) => {
  const payload = JSON.stringify({ createdAt, id });
  return Buffer.from(payload).toString("base64url");
};

const decodeParams = (cursor) => {
  try {
    const payload = Buffer.from(cursor, "base64url").toString("utf-8");
    const { createdAt, id } = JSON.parse(payload);
    if (!createdAt || !id) {
      return null;
    } else {
      return { createdAt, id };
    }
  } catch (error) {
    return error;
  }
};

export { encodeParams, decodeParams };
