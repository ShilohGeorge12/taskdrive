import { initEdgeStore } from '@edgestore/server';
import { initEdgeStoreClient } from '@edgestore/server/core';
import { type EdgeStoreRouter } from '@/app/api/edgestore/[...edgestore]/route';

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
	file: es.fileBucket(),
});

export const backendClient = initEdgeStoreClient({
	router: edgeStoreRouter,
});
