import React, { useState, useEffect } from 'react'
import Styles from './Product.module.css'
import { animated, useSpring } from 'react-spring'
import Button from '@mui/material/Button';
import Link from 'next/link'
import { Pagination } from '@mui/material';

import { AddProductToCart, getQueryById, readData, readDataBySearch } from '/public/store/ProductState'

import { useDispatch, useSelector } from 'react-redux'

function Items() {



    return (
        <>
            {
                useSelector(state => state.paginator.nodes) ?

                    useSelector(state => state.paginator.nodes)?.map((item, index) => (
                        <div key={index}><Product product={item} /></div>
                    ))
                    :
                    <h1>Loading...</h1>
            }
        </>
    );
}

export default function PaginatedItems() {
    // We start with an empty list of items.
    const dispatch = useDispatch()
    const search = useSelector(state => state?.search?.product)

    const currentItemsLength = useSelector(state => state?.paginator?.prod_length) ?? 100
    const pageLength = 20
    const pageCount = Math.ceil(currentItemsLength / pageLength)


    const getPageValue = async (type, page, selected) => {
        console.log(currentItemsLength)
        if (selected == true) {
            if (search == null) {
                const current = await readData(page, pageLength).then(
                  (res) => res
                );

                dispatch({
                  type: "paginate/goto",
                  payload: {
                    prod_length: current.quantity,
                    nodes: current.data,
                  },
                });
            }
            // else {
            //     dispatch({
            //         type: 'paginate/goto',
            //         payload: {
            //             prod_length: await readDataBySearch(search, page, 20)
            //                 .then(res => res.quantity),
            //             nodes: await readDataBySearch(search, page, 20)
            //                 .then(res => res.data)
            //         }
            //     })
            // }
        }
    }


    return (
        <>
            {/* <Items currentItems={paginator.current_items} /> */}
            <Items />

            <div className="w-full flex justify-center">


                <Pagination
                    color="primary"
                    count={pageCount}
                    //onChange={(e) => handlePageClick(e)}
                    getItemAriaLabel={(type, page, selected) => getPageValue(type, page, selected)}
                    siblingCount={5}
                />
            </div>
        </>
    );
}



function Product({ product }) {

    const dispatch = useDispatch()
    const username = useSelector(state => state?.user?.user?.username)

    const addCartProduct = async (id) => {

        if (username) {
            const prod = await AddProductToCart(id, username).then(res =>
                res
            )
            dispatch({
                type: 'cart/add-product',
                payload: prod
            })
        }
        else {
            const cart = JSON.parse(window.localStorage?.getItem('cart-products')) ?? []

            if (id) {
                window.localStorage.setItem('cart-products', JSON.stringify([...cart, { products: id, quantity: 1 }]))
                dispatch({
                    type: 'cart/add-product',
                    payload: await getQueryById(id).then(res => res)
                })

            }
        }

    }

    const styles = useSpring({

        to: [
            { opacity: 0.05 },
            { opacity: 1 },
        ],
        from: { opacity: 0 },
    })



    return (
        <animated.div style={styles} className={Styles.post}>
            <span className={Styles.Statement}>
                {
                    product.state == "sale" ? "Giảm" :
                        product.state == "out-of-stock" ? "Hết hàng" : null
                }
            </span>
            <div className={Styles.productInner}>
                <Link href={`product-detail/${product.product_id}`}>
                    <a>
                        <div className={Styles.body}>
                            <img lazy-load="true" className={Styles.productImg} src={product.imgSrc} />
                        </div>
                        <div className={`text-ellipsis h-12`}>
                            <p>{product.title}</p>
                        </div>
                        <div className={Styles.info}>


                            <span className={`text-red-500 ${Styles.price}`}>{product.price}</span>
                            <span>
                                {/* <Button className={Styles.button_wishList}>
                                    <FaHeart/>
                                </Button> */}
                                <Button variant={"outlined"} color="success" className={Styles.button_buy}>Mua</Button>
                            </span>


                        </div>
                    </a>
                </Link>
                <hr />
                <Button
                    variant={product.state == "out-of-stock" ? "disabled" : "outlined"}
                    className={Styles.button_addCart}
                    onClick={() => addCartProduct(product.product_id)}
                >
                    Thêm vào giỏ hàng
                </Button>
            </div>

        </animated.div>
    )
}
