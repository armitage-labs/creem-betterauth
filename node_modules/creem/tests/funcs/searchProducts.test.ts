import { Creem } from "../../src/index.js";
import { describe, it, expect } from "@jest/globals";
import { APIError } from "../../src/models/errors/index.js";
import { fail } from "../../src/lib/matchers.js";
import {
  TEST_API_KEY,
  TEST_SERVER_IDX,
  TEST_MODE,
} from "../fixtures/testValues.js";

// Create an actual instance of Creem for testing
const creem = new Creem({
  serverIdx: TEST_SERVER_IDX,
});

describe("searchProducts", () => {
  it("should handle API authentication errors", async () => {
    try {
      // Attempt to call SDK method with invalid API key
      await creem.searchProducts({
        xApiKey: "fail",
      });
      // If it succeeds, fail the test (we expect it to throw)
      fail("Expected an API error but none was thrown");
    } catch (error) {
      // We expect this to fail with a 403 error due to invalid API key
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).statusCode).toBe(403);
    }
  });

  it("should search products successfully", async () => {
    // When using the SDK instance directly, it returns ProductEntity[]
    const result = await creem.searchProducts({
      xApiKey: TEST_API_KEY,
    });

    // Test direct SDK method
    expect(result).toHaveProperty("items");
    expect(result.items).toBeInstanceOf(Array);
    if (result.items.length > 0) {
      expect(result.items[0]).toHaveProperty("id");
      expect(result.items[0]).toHaveProperty("name");
      expect(result.items[0]).toHaveProperty("description");
      expect(result.items[0]).toHaveProperty("price");
      expect(result.items[0]).toHaveProperty("currency");
      expect(result.items[0]).toHaveProperty("billingType");
      expect(result.items[0]).toHaveProperty("billingPeriod");
      expect(result.items[0]).toHaveProperty("status");
      expect(result.items[0]).toHaveProperty("taxMode");
      expect(result.items[0]).toHaveProperty("taxCategory");
      expect(result.items[0]).toHaveProperty("productUrl");
      expect(result.items[0]).toHaveProperty("mode", TEST_MODE);
    }
  });

  it("should handle pagination parameters correctly", async () => {
    const pageSize = 2;
    const result = await creem.searchProducts({
      xApiKey: TEST_API_KEY,
      pageSize: pageSize,
      pageNumber: 1,
    });

    expect(result.items.length).toBeLessThanOrEqual(pageSize);
    expect(result.pagination.currentPage).toBe(1);
    expect(result.pagination.totalPages).toBeGreaterThanOrEqual(1);
    expect(result.pagination.totalRecords).toBeGreaterThanOrEqual(
      result.items.length
    );
  });

  it("should handle validation errors", async () => {
    try {
      // Use invalid input to trigger validation error
      await creem.searchProducts({
        xApiKey: "",
      });
      fail("Expected validation error but none was thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it("should handle invalid pagination parameters", async () => {
    try {
      await creem.searchProducts({
        xApiKey: TEST_API_KEY,
        pageNumber: -1, // Invalid page number
      });
      fail("Expected error with invalid page number but none was thrown");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
