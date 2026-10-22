import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product } from '../../products/ProductPage';

// Define our single API slice object
export const productApi = createApi({
	// The cache reducer expects to be added at `state.api` (already default - this is optional)
	reducerPath: 'products',
	// All of our requests will have URLs starting with '/fakeApi'
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://services.odata.org/northwind/northwind.svc/',
	}),
	// The "endpoints" represent operations and requests for this server
	endpoints: (builder) => ({
		// The `getPosts` endpoint is a "query" operation that returns data.
		// The return value is a `Post[]` array, and it takes no arguments.
		getProducts: builder.query<Product[], void>({
			// The URL for the request is '/fakeApi/posts'
			query: () => '/Products',
			transformResponse: (response: { value: Product[] }) => response.value,
		}),
	}),
});

// Export the auto-generated hook for the `getProducts` query endpoint
export const { useGetProductsQuery } = productApi;
