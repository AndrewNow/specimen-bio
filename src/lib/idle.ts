/** Runs `task` once the browser is idle, with a timeout so it cannot wait forever. */
export function scheduleIdle(task: () => void, timeout = 2000): () => void {
	if (typeof window.requestIdleCallback === 'function') {
		const id = window.requestIdleCallback(task, { timeout });
		return () => window.cancelIdleCallback(id);
	}

	const id = window.setTimeout(task, 200);
	return () => window.clearTimeout(id);
}
