'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LayoutGrid, Plus, Rows3, X } from 'lucide-react';
import React from 'react';
import { Random } from 'random';
import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function Page() {
  const [grid, setGrid] = React.useState<boolean>(false);
  const [input, setInput] = React.useState<string[]>([]);
  const [seed, setSeed] = React.useState(Date.now().toString());

  const [items, setItems] = React.useState<string[]>([]);
  const [shuffledItems, setShuffledItems] = React.useState<string[]>(items);

  function handleAddItems() {
    const newItems = input
      .map((it) => it.trim())
      .filter((it) => it.length > 0)
      .filter((it) => !items.includes(it));
    setItems((prev) => [...prev, ...newItems]);
    setShuffledItems((prev) => [...prev, ...newItems]);
    setInput([]);
  }

  function handleRemoveItem(item: string) {
    setItems((prev) => prev.filter((it) => it !== item));
    setShuffledItems((prev) => prev.filter((it) => it !== item));
  }

  function handleClear() {
    setItems([]);
    setShuffledItems([]);
  }

  function shuffleArray<T>(array: T[]): T[] {
    const rng = new Random(seed);
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rng.float() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function handleShuffle() {
    setShuffledItems(shuffleArray(items));
  }

  return (
    <main className={cn('h-full', 'lg:flex lg:flex-col lg:items-center')}>
      <h1 className="text-3xl text-center hidden lg:block">
        Seeded Random Order
      </h1>

      <div
        className={cn('w-full px-8', 'lg:flex-1', 'lg:flex lg:items-center')}
      >
        {/* Left */}

        <div
          className={cn(
            'lg:w-1/3 lg:px-[4%]',
            'sticky top-0 z-50 bg-background',
          )}
        >
          <h1 className="text-3xl text-center lg:hidden block">
            Seeded Random Order
          </h1>

          {/* TextArea Input Box */}

          <Textarea
            placeholder="One item per line"
            className="my-2 lg:h-80 h-40"
            value={input.join('\n')}
            onChange={(e) => setInput(e.target.value.split('\n'))}
            onKeyUp={(e) => {
              if (e.shiftKey || e.ctrlKey) {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddItems();
                }
              }
            }}
          />

          {/* Add Button */}

          <div className="text-center md:px-4">
            <Button
              className="w-full"
              size="sm"
              variant="outline"
              onClick={handleAddItems}
            >
              <span className="flex items-center gap-2 pr-4">
                <Plus /> Add to List
              </span>
              <Badge
                variant="secondary"
                className="rounded-sm hidden lg:inline"
              >
                Ctrl + Enter
              </Badge>
            </Button>
          </div>

          {/* Seed input */}

          <div className="lg:pt-8 pt-4 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <label>Seed</label>
            <Input
              className="h-8"
              value={seed}
              onChange={(e) => setSeed(e.target.value.trim())}
            />
          </div>

          {/* Shuffle Button */}

          <div className="text-center py-4">
            <Button className="w-full h-12 uppercase" onClick={handleShuffle}>
              Shuffle
            </Button>

            <Button
              variant="ghost"
              className="w-full uppercase"
              onClick={handleClear}
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Right */}

        <div className={cn('h-full', 'lg:flex-1 lg:p-8')}>
          {/* Toggle between grid / list */}

          <div className="text-start p-2 hidden md:block">
            <ToggleGroup
              type="single"
              className="w-min"
              value={grid ? 'grid' : 'list'}
              onValueChange={(value) => setGrid(value === 'grid')}
            >
              <ToggleGroupItem value="grid">
                <LayoutGrid />
              </ToggleGroupItem>
              <ToggleGroupItem value="list">
                <Rows3 />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div
            className={cn(
              'gap-x-2 gap-y-4',
              grid
                ? 'md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row'
                : 'flex flex-col items-center',
            )}
          >
            {shuffledItems.map((name, index) => {
              return (
                <Card key={index} className="lg:max-w-xl w-full">
                  <CardHeader className="py-1">
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-4">
                        <span className="text-zinc-500">{index + 1}</span>
                        <span>{name}</span>
                      </span>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(name)}
                      >
                        <X />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
