import { Creem } from "../../src/index.js";
import { describe, it, expect } from "@jest/globals";
import { APIError } from "../../src/models/errors/index.js";
import { fail } from "../../src/lib/matchers.js";
import {
  TEST_API_KEY,
  TEST_CUSTOMER_ID,
  TEST_ORDER_ID,
  TEST_PRODUCT_SUBSCRIPTION_ID,
  TEST_SERVER_IDX,
  TEST_MODE,
} from "../fixtures/testValues.js";

// Create an actual instance of Creem for testing
const creem = new Creem({
  serverIdx: TEST_SERVER_IDX,
});

describe("searchTransactions", () => {
  it("should handle API authentication errors", async () => {
    try {
      await creem.searchTransactions({
        xApiKey: "fail",
      });
      fail("Expected an API error but none was thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).statusCode).toBe(403);
    }
  });

  it("should search transactions with no filters successfully", async () => {
    const result = await creem.searchTransactions({
      xApiKey: TEST_API_KEY,
    });

    // Test the response structure
    expect(result).toHaveProperty("items");
    expect(result).toHaveProperty("pagination");
    expect(Array.isArray(result.items)).toBe(true);
    expect(result.pagination).toHaveProperty("totalRecords");
    expect(result.pagination).toHaveProperty("totalPages");
    expect(result.pagination).toHaveProperty("currentPage");
    expect(result.pagination).toHaveProperty("nextPage");
    expect(result.pagination).toHaveProperty("prevPage");

    // If there are any items, verify they have the correct mode
    if (result.items.length > 0) {
      expect(result.items[0]).toHaveProperty("mode", TEST_MODE);
    }
  });

  it("should search transactions by customer ID successfully", async () => {
    const result = await creem.searchTransactions({
      xApiKey: TEST_API_KEY,
      customerId: TEST_CUSTOMER_ID,
    });

    // Test the response structure and content
    expect(result).toHaveProperty("items");
    expect(Array.isArray(result.items)).toBe(true);

    // If there are any items, verify they belong to the specified customer
    if (result.items.length > 0) {
      result.items.forEach((transaction) => {
        expect(transaction.customer).toBe(TEST_CUSTOMER_ID);
      });
    }
  });

  it("should search transactions by order ID successfully", async () => {
    const result = await creem.searchTransactions({
      xApiKey: TEST_API_KEY,
      orderId: TEST_ORDER_ID,
    });

    // Test the response structure and content
    expect(result).toHaveProperty("items");
    expect(Array.isArray(result.items)).toBe(true);

    // If there are any items, verify they belong to the specified order
    if (result.items.length > 0) {
      result.items.forEach((transaction) => {
        expect(transaction.order).toBe(TEST_ORDER_ID);
      });
    }
  });

  it("should search transactions by product ID successfully", async () => {
    const result = await creem.searchTransactions({
      xApiKey: TEST_API_KEY,
      productId: TEST_PRODUCT_SUBSCRIPTION_ID,
    });

    // Test the response structure
    expect(result).toHaveProperty("items");
    expect(Array.isArray(result.items)).toBe(true);
  });

  it("should handle pagination correctly", async () => {
    const pageSize = 10;
    const pageNumber = 1;

    const result = await creem.searchTransactions({
      xApiKey: TEST_API_KEY,
      pageSize,
      pageNumber,
    });

    // Test pagination structure
    expect(result.pagination).toHaveProperty("totalRecords");
    expect(result.pagination).toHaveProperty("totalPages");
    expect(result.pagination).toHaveProperty("currentPage", pageNumber);
    expect(result.pagination).toHaveProperty("nextPage");
    expect(result.pagination).toHaveProperty("prevPage");

    // Verify the number of items returned matches the page size
    expect(result.items.length).toBeLessThanOrEqual(pageSize);
  });

  it("should handle multiple filters together", async () => {
    const result = await creem.searchTransactions({
      xApiKey: TEST_API_KEY,
      customerId: TEST_CUSTOMER_ID,
      orderId: TEST_ORDER_ID,
      productId: TEST_PRODUCT_SUBSCRIPTION_ID,
      pageSize: 5,
      pageNumber: 1,
    });

    // Test the response structure
    expect(result).toHaveProperty("items");
    expect(result).toHaveProperty("pagination");
    expect(Array.isArray(result.items)).toBe(true);

    // If there are any items, verify they match all filters
    if (result.items.length > 0) {
      result.items.forEach((transaction) => {
        expect(transaction.customer).toBe(TEST_CUSTOMER_ID);
        expect(transaction.order).toBe(TEST_ORDER_ID);
      });
    }
  });

  it("should handle network errors gracefully", async () => {
    // Create a new instance with an invalid server URL to simulate network error
    const creemWithInvalidServer = new Creem({
      serverIdx: TEST_SERVER_IDX,
      serverURL: "http://invalid-url",
    });

    try {
      await creemWithInvalidServer.searchTransactions({
        xApiKey: TEST_API_KEY,
      });
      fail("Expected network error but none was thrown");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
