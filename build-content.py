#!/usr/bin/env python3
"""
Rebuilds content-data.js from assets/content/en/*.json files (EN fallback).
Run after editing any JSON content file:
    python3 build-content.py
"""
import json, os

BASE = os.path.dirname(os.path.abspath(__file__))
CONTENT_DIR = os.path.join(BASE, 'public', 'assets', 'content', 'en')
OUTPUT = os.path.join(BASE, 'public', 'content-data.js')
FILES = ['shared', 'index', 'about', 'team', 'projects', 'news', 'careers', 'timeline']

parts = []
for name in FILES:
    path = os.path.join(CONTENT_DIR, name + '.json')
    with open(path, encoding='utf-8') as f:
        data = json.load(f)
    parts.append(f'  {name}: {json.dumps(data, indent=2, ensure_ascii=False)}')

js = '/* Auto-generated from assets/content/en/*.json — fallback data */\n'
js += 'const CONTENT = {\n' + ',\n'.join(parts) + '\n};\n'

with open(OUTPUT, 'w', encoding='utf-8') as f:
    f.write(js)

print(f'✓ content-data.js rebuilt ({len(js):,} bytes)')
