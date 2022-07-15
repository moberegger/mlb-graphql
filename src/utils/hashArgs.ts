const { createHash } = await import("node:crypto");

export default (...args: any[]) => {
  const hash = createHash("sha256");

  args.forEach((arg) => {
    if (typeof arg === "string") hash.update(arg);
    else hash.update(JSON.stringify(arg));
  });

  return hash.digest("hex");
};
