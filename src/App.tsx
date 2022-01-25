import React from 'react';
import './App.css';

const goodsFromServer: Good[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortBy {
  Default = '',
  Length = 'length',
  Alphabetically = 'alphabetically',
}

type State = {
  goods: Good[],
  showList: boolean,
  isReversed: boolean,
  sortBy: SortBy,
  goodsLength: number,
};

class App extends React.Component<{}, State> {
  state: State = {
    goods: goodsFromServer,
    showList: false,
    isReversed: false,
    sortBy: SortBy.Default,
    goodsLength: 1,
  };

  showGoods = () => {
    this.setState({
      showList: true,
    });
  };

  reverse = () => {
    this.setState(state => ({
      isReversed: !state.isReversed,
    }));
  };

  changeSortBy = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({
      sortBy: event.currentTarget.name as SortBy,
    });
  };

  reset = () => {
    this.setState({
      goods: goodsFromServer,
      isReversed: false,
      sortBy: SortBy.Default,
    });
  };

  goodsToShow = () => {
    const {
      goods,
      isReversed,
      goodsLength,
    } = this.state;

    const filteredGoods = goods.filter(good => good.length >= goodsLength);

    filteredGoods.sort((good1: Good, good2: Good) => {
      switch (this.state.sortBy) {
        case SortBy.Alphabetically:
          return good1.localeCompare(good2);
        case SortBy.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });

    if (!isReversed) {
      filteredGoods.reverse();
    }

    return filteredGoods;
  };

  render(): React.ReactNode {
    if (!this.state.showList) {
      return (
        <button
          type="button"
          onClick={this.showGoods}
        >
          Start
        </button>
      );
    }

    const goods = this.goodsToShow();

    return (
      <div className="App box">
        <h1 className="title is-1">Goods</h1>

        <button
          type="button"
          onClick={this.reverse}
        >
          Reverse
        </button>
        <button
          type="button"
          onClick={this.reset}
        >
          Reset
        </button>

        <div>
          <button
            name={SortBy.Alphabetically}
            type="button"
            onClick={this.changeSortBy}
          >
            Sort alphabetically
          </button>

          <button
            name={SortBy.Length}
            type="button"
            onClick={this.changeSortBy}
          >
            Sort by length
          </button>
        </div>

        {goods.length !== 0 && (
          <ul>
            {goods.map(good => (
              <li key={good} className="listItem">{good}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default App;
