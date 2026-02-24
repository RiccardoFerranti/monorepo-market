type TLogGroupOptions = {
  title: string;
  color?: string;
  data?: Record<string, unknown>;
};

/**
 * Logs a collapsible console group with a styled title and optional key-value data.
 *
 * Only logs when `process.env.NODE_ENV` is "development".
 *
 * @param {Object} options - Log group options.
 * @param {string} options.title - The title of the console group.
 * @param {string} [options.color="#22c55e"] - CSS color for the group title.
 * @param {Record<string, unknown>} [options.data] - Optional key-value pairs to log inside the group.
 */
export function logGroup(
  { title, color = "#22c55e", data }: TLogGroupOptions,
  env = process.env.NODE_ENV,
) {
  if (env !== "development") return;

  console.groupCollapsed(`%c${title}`, `color:${color};font-weight:600;`);

  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
  }

  console.groupEnd();
}
