# Local DeFi Smart-Contract Research Agent

This agent combines:
- Ollama for local reasoning and tool calling
- ChromaDB on localhost for semantic retrieval over large PDF research sets
- PDF.js for page-aware PDF extraction
- Hardhat 3 for Solidity compilation and testing

## Directory contract

- `research/` — put all research PDFs here
- `workspace/` — the Hardhat project the agent may modify
- `.research-manifest.json` — generated index state; unchanged PDFs are skipped

## Architecture

`PDFs -> page extraction -> overlapping chunks -> Ollama embeddings -> ChromaDB`

`user request -> agent -> targeted research retrieval -> DESIGN.md -> Solidity/tests -> Hardhat compile -> Hardhat test -> debug loop`

The agent never gives the entire PDF corpus to the model. It retrieves relevant chunks with filename/page metadata.

## Safety boundary

The agent only writes under `workspace/` and only runs Hardhat commands there. It is intended for local development and research, not live deployment.


## Economic analysis layer

The project now includes `economic_analysis.js` and an `economic_analysis` agent tool.

The economic layer is deliberately separate from ordinary compilation/testing. It:

- scans Solidity for debt, collateral, liquidation, oracle, interest, share/index, reserve, external-call, unchecked-arithmetic, and rounding signals;
- detects missing economic test coverage;
- runs targeted economic/invariant/liquidation/fuzz tests when present;
- falls back to the complete Hardhat suite;
- writes `workspace/ECONOMIC_ANALYSIS.json`;
- treats high/critical findings as blockers for the autonomous agent.

This is a validation framework, not a formal proof. The agent is instructed to create protocol-specific economic invariants before running it.

### Recommended validation sequence

`research -> DESIGN.md -> implementation -> compile -> unit tests -> economic/invariant tests -> economic_analysis -> fix -> repeat`

### Economic properties to test

For lending protocols, the agent should derive and test properties such as:

- asset/debt conservation;
- aggregate debt equals the sum represented by user debt/index accounting;
- share/index conversions preserve value within documented rounding bounds;
- indexes move monotonically when intended;
- repeated accrual does not double count;
- collateralized positions remain solvent unless deliberately liquidated;
- liquidation cannot seize more collateral than allowed or create protocol insolvency;
- fees/reserves are not double counted;
- stale/invalid oracle values cannot create unsafe borrowing;
- dust and repeated tiny operations cannot extract value;
- the novel mechanism preserves its stated invariant at normal and boundary values.

`ECONOMIC_ANALYSIS.json` is an artifact for the agent and developer to inspect; it should not be treated as a formal security audit or proof of safety.


<!-- HOW TO START CHROMADA -->
That error is a Command Prompt message, and your earlier output showed a `C:\Users\...>` prompt, so you're in `cmd`, not PowerShell. The activation command I gave (`Activate.ps1`) only works in PowerShell, so `chroma` never got onto your PATH. That was my mistake for not asking which shell you use.

If you created the `chroma-env` venv, you have two options. First, activate it the Command Prompt way, then run Chroma:

```bat
chroma-env\Scripts\activate.bat
chroma run --path .\chroma_data --port 8000
```

Or skip activation and call the executable directly. This is the most reliable option:

```bat
chroma-env\Scripts\chroma.exe run --path .\chroma_data --port 8000
```

If you installed with `pip install chromadb` without a venv, the install went into your global Python, and its `Scripts` folder isn't on PATH. Find the folder and run `chroma.exe` from there:

```bat
python -c "import sysconfig; print(sysconfig.get_path('scripts'))"
```

That prints a folder path. Run `"<that path>\chroma.exe" run --path .\chroma_data --port 8000`, with the quotes if the path has spaces.

If `chroma.exe` isn't in that folder, `python -m pip` may have installed into a different Python than the one `python` runs. As a last resort, this launches the CLI without needing `chroma` on PATH:

```bat
python -c "from chromadb.cli.cli import app; app()" run --path .\chroma_data --port 8000
```

I'm fairly confident that works but haven't run it on Windows.

When it starts, you should see Chroma's startup banner with the address `localhost:8000`. Leave that window open, then run `npm run doctor` in a second window. If something else fails, paste the exact output.
