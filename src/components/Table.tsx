import { ReactNode, useState } from 'react';
import styles from './Table.module.css';

const screenSize = Math.max(window.screen.width, window.screen.height);

export const Table = <Row,>({
  className,
  headerHeight,
  rowHeight,
  header,
  rows,
  getRowKey,
  renderRow,
}: {
  className?: string;
  headerHeight: number;
  rowHeight: number;
  header: ReactNode;
  rows: Row[];
  getRowKey: (row: Row) => string | number;
  renderRow: (row: Row) => ReactNode;
}) => {
  const [scrollTop, setScrollTop] = useState(0);

  const firstVisibleRow = Math.min(
    rows.length,
    Math.max(0, Math.floor(scrollTop / rowHeight)),
  );

  const rowsToRender = Math.ceil(screenSize / rowHeight);
  const tableHeight = headerHeight + rowHeight * rows.length + 16;

  const rowNodes: ReactNode[] = [];

  for (
    let i = firstVisibleRow;
    i < Math.min(firstVisibleRow + rowsToRender, rows.length);
    i++
  ) {
    const row = rows[i];

    rowNodes.push(
      <div
        color={String(i)}
        key={getRowKey(row)}
        className={styles.row}
        style={{ top: rowHeight * i + headerHeight, height: rowHeight }}
      >
        {renderRow(row)}
      </div>,
    );
  }

  return (
    <div
      className={`${styles.table} ${className || ''}`}
      onScroll={(event) =>
        setScrollTop((event.target as HTMLDivElement).scrollTop)
      }
    >
      <div style={{ height: tableHeight }}>
        <div className={styles.header}>{header}</div>
        {rowNodes}
      </div>
    </div>
  );
};
