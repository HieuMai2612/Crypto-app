import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss";
import { Select, Input, InputGroup, InputRightElement, IconButton, Icon } from '@chakra-ui/react'
import { FaSearch, FaCheck } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { apiCoinMarket } from '../../../src/features/counter/counterSlice'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer
} from '@chakra-ui/react';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { FaHeart } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

const Layout = () => {

    const value = [10, 20, 50, 100]
    const dataCoin = useSelector(apiCoinMarket)
    const [searchInput, setSearchInput] = useState('');
    const tagsList = dataCoin.map(item => item.tags).flat();
    const [dataTag, setDataTag] = useState([]);
    const [tag, setTag] = useState();
    const [selectedId, setSelectedId] = useState([]);
    const [dataAPI, setDataAPI] = useState([]);

    const [sortID, setSortID] = useState(true);
    const [sortPrice, setSortPrice] = useState(true);
    const [sortName, setSortName] = useState(true);
    const [sort24hPercent, setSort24hPercent] = useState(true);
    const [sort7dPercent, setSort7dPercent] = useState(true);
    const [sortVolume, setSortVolume] = useState(true);
    const [sortMarketCap, setSortMarketCap] = useState(true);
    const [sortCirculing, setSortCirculing] = useState(true);

    const [watchList, setWatchList] = useState([]);
    const [getWatchList, setGetWatchList] = useState(false);
    const [dataSlice, setDataSlice] = useState(20);



    const handleSortId = () => {
        const listSort = [...dataAPI];
        setSortPrice(!sortPrice);
        listSort.sort((a, b) =>
            sortPrice
                ? a.id - b.id
                : b.id - a.id
        );
        setDataAPI(listSort);
    };


    const handleSortPrice = () => {
        const listSort = [...dataAPI];
        setSortPrice(!sortID);
        listSort.sort((a, b) =>
            sortID
                ? a.quote.USD.price - b.quote.USD.price
                : b.quote.USD.price - a.quote.USD.price
        );
        setDataAPI(listSort);
    };

    const handleSortName = () => {
        const listSort = [...dataAPI];
        setSortName(!sortName);
        listSort.sort((a, b) =>
            sortName
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        );
        setDataAPI(listSort);
    };

    const handleSort24hPercent = () => {
        const listSort = [...dataAPI];
        setSort24hPercent(!sort24hPercent);
        listSort.sort((a, b) =>
            sort24hPercent
                ? a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h
                : b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h
        );
        setDataAPI(listSort);
    };

    const handleSort7dPercent = () => {
        const listSort = [...dataAPI];
        setSort7dPercent(!sort7dPercent);
        listSort.sort((a, b) =>
            sort7dPercent
                ? a.quote.USD.percent_change_7d - b.quote.USD.percent_change_7d
                : b.quote.USD.percent_change_7d - a.quote.USD.percent_change_7d
        );
        setDataAPI(listSort);
    };

    const handleSortMarketCap = () => {
        const listSort = [...dataAPI];
        setSortMarketCap(!sortMarketCap);
        listSort.sort((a, b) =>
            sortMarketCap
                ? a.quote.USD.market_cap - b.quote.USD.market_cap
                : b.quote.USD.market_cap - a.quote.USD.market_cap
        );
        setDataAPI(listSort);
    };

    const handleSortVolume = () => {
        const listSort = [...dataAPI];
        setSortVolume(!sortVolume);
        listSort.sort((a, b) =>
            sortVolume
                ? a.quote.USD.volume_24h - b.quote.USD.volume_24h
                : b.quote.USD.volume_24h - a.quote.USD.volume_24h
        );
        setDataAPI(listSort);
    };

    const handleSortCirculing = () => {
        const listSort = [...dataAPI];
        setSortCirculing(!sortCirculing);
        listSort.sort((a, b) =>
            sortCirculing
                ? a.circulating_supply - b.circulating_supply
                : b.circulating_supply - a.circulating_supply
        );
        setDataAPI(listSort);
    };

    const handleSelectChange = (e) => {
        setTag(e.target.value)
        setSelectedId(e.target.value);
        const newData = dataCoin.filter((item) => {
            return item.tags.includes(e.target.value)
        })
        setDataAPI(newData)
        if (e.target.value === '') setDataAPI(dataCoin)
        setItemOffset(lastRecord);
    };

    const filtered = !searchInput
        ? dataAPI
        : dataAPI.filter((item) =>
            item.name.toLowerCase().includes(searchInput.toLowerCase())
        );

    const [currentPage, setCurrentPage] = useState(1);
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + dataSlice;
    const currentItems = filtered.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filtered.length / dataSlice);

    const indexOfLastRecord = currentPage * endOffset;
    const lastRecord = indexOfLastRecord - endOffset;
    const handlePageClick = (event) => {
        const newOffset = (event.selected * dataSlice) % filtered.length;
        setItemOffset(newOffset);
    };


    const handleGetItemWatch = (item) => {
        setWatchList(
            [...new Set([...watchList,
                item
            ])]
        )
    };

    const handleWatchList = () => {
        setGetWatchList(!getWatchList);
    };

    useEffect(() => {
        if (getWatchList) {
            setDataAPI(watchList);
            setItemOffset(lastRecord);
        } else {
            setDataAPI(dataCoin)
        }
    }, [getWatchList])

    const clickNewTab = (dataCoin) => {
        window.open(`https://coinmarketcap.com/currencies/${dataCoin}`)
    }

    const handleSliceData = (e) => {
        setDataSlice(e.target.value)
    }

    useEffect(() => {
        setDataAPI(dataCoin)
        const newTagname = [...new Set(tagsList)]
        setDataTag(newTagname)
    }, [dataCoin])



    return (
        <>
            <div className={styles['layout-wrapper-top']}>
                <InputGroup className={styles['layout-wrapper-top-group']} size='md'>
                    <Input className={styles['layout-wrapper-top-input']}
                        pr='4.5rem'
                        type="search"
                        placeholder="Search by coin name or symbol"
                        onChange={(e) => setSearchInput(e.target.value)}
                        value={searchInput}
                    />
                    <IconButton className={styles['layout-wrapper-top-button']}
                        aria-label='Search database'
                        variant="customIconButton"
                        icon={<Icon as={FaSearch} />} />

                </InputGroup>
                <Select
                    onChange={handleSelectChange}
                    value={tag}
                    bg="black" color="black"
                    variant="outline" className={styles['layout-wrapper-top-select']} placeholder='Filter by tag' >
                    {
                        [...new Set(tagsList)].map((item) => (
                            <option
                                style={{ color: 'black' }}
                                className={styles['layout-wrapper-top-select-option']} key={item} value={item}>{item}</option>
                        ))
                    }
                </Select>
                <Select className={styles['layout-wrapper-top-select']} placeholder='Convert currency' />
                <IconButton
                    onClick={handleWatchList}
                    className={styles['layout-wrapper-top-icon']}
                    aria-label='Search database' variant="customIconButton"
                    icon={<Icon as={FaCheck} />} />
            </div>
            <div className={styles['layout-wrapper-body']}>
                <TableContainer  >
                    <Table variant='simple'>
                        <TableCaption></TableCaption>
                        <Thead>
                            <Tr>
                                <Th></Th>
                                <Th onClick={handleSortId}># <ChevronDownIcon /></Th>
                                <Th onClick={handleSortName}>Name <ChevronDownIcon /></Th>
                                <Th onClick={handleSortPrice}>Price <ChevronDownIcon /></Th>
                                <Th onClick={handleSort24hPercent}>24h% <ChevronDownIcon /></Th>
                                <Th onClick={handleSort7dPercent}>7d% <ChevronDownIcon /> </Th>
                                <Th onClick={handleSortMarketCap}>Market Cap <ChevronDownIcon /></Th>
                                <Th onClick={handleSortVolume}>Volume(24h) <ChevronDownIcon /></Th>
                                <Th onClick={handleSortCirculing}>Circuling Supply <ChevronDownIcon /></Th>
                                <Th>Last 7 Days</Th>

                            </Tr>
                        </Thead>

                        <Tbody>
                            {currentItems?.map((item, index) => (
                                <>
                                    <Tr  >
                                        <Th className='icon' onClick={() => handleGetItemWatch(item)} > <Icon className={styles['layout-wrapper-body-icon']} as={FaHeart} /></Th>
                                        <Th className='icon' onClick={() => clickNewTab(item.slug)}  >{index + 1}</Th>
                                        <Th className='icon' onClick={() => clickNewTab(item.slug)} >
                                            <img width="24" height="24" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`} alt="" />
                                            {item.name}
                                        </Th>
                                        <Th className='icon' onClick={() => clickNewTab(item.slug)} >${item.quote.USD.price} </Th>
                                        <Th className='icon' onClick={() => clickNewTab(item.slug)}>{item.quote.USD.percent_change_24h}%</Th>
                                        <Th className='icon' onClick={() => clickNewTab(item.slug)}>{item.quote.USD.percent_change_7d}%</Th>
                                        <Th className='icon' onClick={() => clickNewTab(item.slug)}>${item.quote.USD.market_cap}</Th>
                                        <Th className='icon' onClick={() => clickNewTab(item.slug)}>${item.quote.USD.volume_24h}</Th>
                                        <Th className='icon' onClick={() => clickNewTab(item.slug)}>{item.circulating_supply} BTC</Th>
                                        <Th className='icon' onClick={() => clickNewTab(item.slug)}>
                                            <img src={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${item.id}.svg`} alt="" />
                                        </Th>
                                    </Tr>
                                </>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>

            </div>
            <div className={styles['layout-wrapper-footer']}>
                <div className={styles['layout-wrapper-footer-number']}>
                    Showing 20-100 out of 1000
                </div>

                <div className={styles['layout-wrapper-footer-pagination']}>
                    {currentItems.length > 10 ? <ReactPaginate disabled
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousLabel=""
                        nextLabel=""
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    /> : null}</div>

                <Select
                    onChange={handleSliceData}
                    value={dataSlice}
                    bg="black" color="black"
                    variant="outline"
                    className={styles['layout-wrapper-footer-select']}
                >
                    {
                        value.map((item) => (
                            <option
                                style={{ color: 'black' }}
                                className={styles['layout-wrapper-top-select-option']} key={item} value={item}>{item}</option>
                        ))
                    }
                </Select>
            </div>
        </>
    )
}

export default Layout