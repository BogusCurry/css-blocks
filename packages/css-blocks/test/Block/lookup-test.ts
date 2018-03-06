import { assert } from "chai";
import { suite, test } from "mocha-typescript";

import { Block } from "../../src/Block";
import { ERRORS } from "../../src/BlockSyntax";

@suite("Block object lookup")
export class LookupTests {
  @test "finds the block"() {
    let block = new Block("test", "test.block.css");
    let found = block.lookup(":scope");
    assert.deepEqual(block.rootClass, found);
  }
  @test "finds a state attribute"() {
    let block = new Block("test", "test.block.css");
    let attr = block.rootClass.ensureValue("[state|foo]");
    let found = block.lookup("[state|foo]");
    assert.deepEqual(attr, found);
  }
  @test "finds a state attribute with a value"() {
    let block = new Block("test", "test.block.css");
    let attr = block.rootClass.ensureValue("[state|foo=bar]");
    let found = block.lookup("[state|foo=bar]");
    assert.deepEqual(attr, found);
  }
  @test "invalid namespaces throw"() {
    let block = new Block("test", "test.block.css");
    assert.throws(
       () => {
      block.lookup("[namespace|foo=bar]");
    }, ERRORS.namespace);
  }
  @test "finds a class"() {
    let block = new Block("test", "test.block.css");
    let klass = block.ensureClass("bar");
    let found = block.lookup(".bar");
    assert.deepEqual(klass, found);
  }
  @test "finds a class with state attribute"() {
    let block = new Block("test", "test.block.css");
    let klass = block.ensureClass("foo");
    let attr = klass.ensureValue("[state|a]");
    let found = block.lookup(".foo[state|a]");
    assert.deepEqual(attr, found);
  }
  @test "finds an class state attribute value"() {
    let block = new Block("test", "test.block.css");
    let klass = block.ensureClass("foo");
    let attr = klass.ensureValue("[state|b=a]");
    let found = block.lookup(".foo[state|b=a]");
    assert.deepEqual(attr, found);
  }
  @test "finds referenced blocks"() {
    let otherBlock = new Block("other", "other.block.css");
    let block = new Block("test", "test.block.css");
    block.addBlockReference("asdf", otherBlock);
    let found = block.lookup("asdf");
    assert.deepEqual(otherBlock.rootClass, found);
    found = block.lookup("asdf:scope");
    assert.deepEqual(otherBlock.rootClass, found);
  }
  @test "finds referenced block class"() {
    let otherBlock = new Block("other", "other.block.css");
    let otherClass = otherBlock.ensureClass("foo");
    let block = new Block("test", "test.block.css");
    block.addBlockReference("asdf", otherBlock);
    let found = block.lookup("asdf.foo");
    assert.deepEqual(otherClass, found);
  }
  @test "finds an attribute"() {
    let block = new Block("test", "test.block.css");
    let namespace = block.rootClass.ensureValue("[my-attr]");
    let found = block.lookup("[my-attr]");
    assert.deepEqual(namespace, found);
  }
  @test "finds an attribute value"() {
    let block = new Block("test", "test.block.css");
    let namespace = block.rootClass.ensureValue("[my-attr=bar]");
    let found = block.lookup("[my-attr=bar]");
    assert.deepEqual(namespace, found);
  }
  @test "finds a class attribute"() {
    let block = new Block("test", "test.block.css");
    let klass = block.ensureClass("foo");
    let namespace = klass.ensureValue("[my-attr]");
    let found = block.lookup(".foo[my-attr]");
    assert.deepEqual(namespace, found);
  }
  @test "finds a class attribute value"() {
    let block = new Block("test", "test.block.css");
    let klass = block.ensureClass("foo");
    let namespace = klass.ensureValue("[my-attr=a]");
    let found = block.lookup(".foo[my-attr=a]");
    assert.deepEqual(namespace, found);
  }
}
