import { BlockFactory, Options as CSSBlocksOptions } from "css-blocks";

import { JSXAnalyzerOptions, parse, parseFile } from "../src/index";
import { MetaAnalysis } from "../src/utils/Analysis";

export function testParse(data: string, filename = "", opts?: JSXAnalyzerOptions, cssBlocksOpts?: CSSBlocksOptions): Promise<MetaAnalysis> {
   let factory = new BlockFactory(cssBlocksOpts || {});
   return parse(filename, data, factory, opts);
}

export function testParseFile(file: string, opts?: JSXAnalyzerOptions, cssBlocksOpts?: CSSBlocksOptions): Promise<MetaAnalysis> {
   let factory = new BlockFactory(cssBlocksOpts || {});
   return parseFile(file, factory, opts);
}
