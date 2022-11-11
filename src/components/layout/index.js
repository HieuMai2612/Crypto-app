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

const Layout = () => {
    const dataCoin = useSelector(apiCoinMarket)
    const [searchInput, setSearchInput] = useState('');
    const tagsList = dataCoin.map(item => item.tags).flat();
    const [dataTag, setDataTag] = useState([]);
    const [tag, setTag] = useState();
    const [selectedId, setSelectedId] = useState([]);
    const [dataAPI, setDataAPI] = useState([]);


    const [sortPrice, setSortPrice] = useState(true);
    const [sortName, setSortName] = useState(true);
    const [sort24hPercent, setSort24hPercent] = useState(true);
    const [sort7dPercent, setSort7dPercent] = useState(true);
    const [sortVolume, setSortVolume] = useState(true);
    const [sortMarketCap, setSortMarketCap] = useState(true);
    const [sortCirculing, setSortCirculing] = useState(true);


    // const handleSortPrice = () => {
    //     const listSort = [...dataAPI];
    //     setSortPrice(!sortPrice);
    //     listSort.sort((a, b) =>
    //         sortPrice
    //             ? a.quote.USD.price - b.quote.USD.price
    //             : b.quote.USD.price - a.quote.USD.price
    //     );
    //     setDataAPI(copyListResult);
    // };


    const handleSortPrice = () => {
        const listSort = [...dataAPI];
        setSortPrice(!sortPrice);
        listSort.sort((a, b) =>
            sortPrice
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
                ? a.name - b.name
                : b.name - a.name
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
    };

    const filtered = !searchInput
        ? dataAPI
        : dataAPI.filter((item) =>
            item.name.toLowerCase().includes(searchInput.toLowerCase())
        );


    useEffect(() => {
        setDataAPI(dataCoin)
        const newTagname = [...new Set(tagsList)]
        setDataTag(newTagname)
    }, [])


    return (
        <>
            <div className={styles['layout-wrapper-top']}>
                <InputGroup clas size='md'>
                    <Input className={styles['layout-wrapper-top-input']}
                        pr='4.5rem'
                        type="search"
                        placeholder="Search by coin name or symbol"
                        onChange={(e) => setSearchInput(e.target.value)}
                        value={searchInput}
                    />
                    <InputRightElement className={styles['layout-wrapper-top-button']} >
                        <IconButton
                            aria-label='Search database'
                            variant="customIconButton"
                            icon={<Icon as={FaSearch} />} />
                    </InputRightElement>
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
                <IconButton className={styles['layout-wrapper-top-icon']} aria-label='Search database' variant="customIconButton"
                    icon={<Icon as={FaCheck} />} />
            </div>
            <div className={styles['layout-wrapper-body']}>
                <TableContainer  >
                    <Table variant='simple'>
                        <TableCaption></TableCaption>
                        <Thead>
                            <Tr>
                                <Th></Th>
                                <Th>#</Th>
                                <Th>Name</Th>
                                <Th onClick={handleSortPrice}>Price <ChevronDownIcon /></Th>
                                <Th >24h%</Th>
                                <Th >7d%</Th>
                                <Th >Market Cap</Th>
                                <Th>Volume(24h)</Th>
                                <Th>Circuling Supply</Th>
                                <Th>Last 7 Days</Th>

                            </Tr>
                        </Thead>

                        <Tbody>
                            {filtered?.map((item, index) => (
                                <>
                                    <Tr  >
                                        <Th className='icon' > <Icon as={FaHeart} /></Th>
                                        <Th className='icon' onClick={() => window.open(`https://coinmarketcap.com/currencies/${item.slug}`)}  >{index + 1}</Th>
                                        <Th className='icon' >

                                            <img width="24" height="24" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`} alt="" />
                                            {item.name}

                                        </Th>
                                        <Th className='icon' >${item.quote.USD.price} </Th>
                                        <Th className='icon' >{item.quote.USD.percent_change_24h}%</Th>
                                        <Th className='icon'>{item.quote.USD.percent_change_7d}%</Th>
                                        <Th className='icon'>${item.quote.USD.market_cap}</Th>
                                        <Th className='icon'>${item.quote.USD.volume_24h}</Th>
                                        <Th className='icon'>{item.circulating_supply} BTC</Th>
                                        <Th className='icon'>
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
            </div>
        </>
    )
}

export default Layout