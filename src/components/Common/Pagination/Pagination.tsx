import React, {useState} from 'react';
import s from './Pagination.module.css';
import cn from 'classnames';

type PaginationPropsType = {
  currentPage: number
  pageSize:number
  totalItemsCount: number
  onPageChanged: (pageNumber:number) => void
  portionSize?: number
}

const Pagination
    : React.FC<PaginationPropsType>
    = ({currentPage, pageSize, totalItemsCount, onPageChanged, portionSize = 10}) => {

  let pageCount = Math.ceil(totalItemsCount / pageSize);
  let pages = [];

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i)
  }

  const portionCount = Math.ceil(pageCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1)
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;


  return (
    <div className={s.paginationWrap}>
      {portionNumber > 1 &&
      <button className={s.buttonPagination} onClick={() => {
        setPortionNumber(portionNumber - 1)
      }}>◁</button>}

      {pages
        .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
        .map(page => {
          return (
            <span key={page}
                  className={cn({[s.selectedPage]:currentPage === page}, s.pageNumber )}
                  onClick={(e) => {
                    onPageChanged(page)
                  }}>
              {page}
            </span>
          )
        }
      )}

      {portionCount > portionNumber &&
      <button className={s.buttonPagination} onClick={() => {
        setPortionNumber(portionNumber + 1)
      }}>▷</button>}
    </div>
  )
}

export default Pagination;
