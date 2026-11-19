---
title: Devin CLI
---

Devin CLI has a native plugin format that bundles skills, rules, MCP servers, and
custom subagents. Svelte provides a Devin plugin at
[`plugins/devin/svelte`](https://github.com/sveltejs/ai-tools/tree/main/plugins/devin/svelte).

The plugin configures the local Svelte MCP server, two Svelte skills, an
always-on rule for using the MCP tools, and the `svelte-file-editor` custom
subagent. The custom subagent is available in local Devin agents; the
always-on rule and MCP server also work in Devin Cloud sessions.

## Installation

Install the plugin from the repository:

```bash
devin plugins install sveltejs/ai-tools#plugins/devin/svelte
```

For local development from a checkout:

```bash
devin plugins install --local ./plugins/devin/svelte
```

After installation, the skills are available as `/svelte:<skill-name>`, for
example `/svelte:svelte-code-writer`. Devin starts the `@sveltejs/mcp` stdio
server automatically when its tools are needed.
