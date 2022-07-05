export default (strings: TemplateStringsArray, ...expressions: string[]) =>
  strings.reduce((previousValue, currentValue, currentIndex) => {
    const expression = expressions[currentIndex];

    if (expression)
      return `${previousValue}${currentValue}${encodeURIComponent(expression)}`;

    return `${previousValue}${currentValue}`;
  }, "");
