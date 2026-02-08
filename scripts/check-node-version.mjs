const [major] = process.versions.node.split('.').map(Number);

const minMajor = 24;
const maxExclusive = 25;

if (Number.isNaN(major) || major < minMajor || major >= maxExclusive) {
  console.error(
    [
      `Unsupported Node.js version: ${process.versions.node}.`,
      `Use an LTS release in the range >=${minMajor} <${maxExclusive} for stable Next.js dev hot reload.`,
      'Tip: run `nvm use` after installing the version in `.nvmrc`.',
    ].join('\n'),
  );
  process.exit(1);
}
