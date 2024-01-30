import React from 'react';
import styles from './Style.module.css';
import VendorsOrdersTable from "./components/WarehouseTables/VendorsOrdersTable.component";
import BarChartComponent from "./components/BarChart/BarChart";
import PieChartComponent from "./components/PieChart/PieChart.view";
import InventoryCategoryTable from "./components/WarehouseTables/PendingOfferTable.component";
import TopProductsTable from "./components/WarehouseTables/InterviewsTable.component";

const WarehouseView = () => {

    const _renderInventoryMovement = () => {
     return (
         <div className={'plainPaper'}>
             <div>Inventory Movement Today</div>
             <div className={styles.moveFlex}>
                <div>
                    <div>Inward</div>
                    <div className={styles.inward}>1</div>
                </div>
                 <div>
                     <div>Outward</div>
                     <div className={styles.inward}>1</div>
                 </div>
             </div>
         </div>
     )}

     const _renderPurchaseOrders = () => {
        return (
            <div>
                <div className={styles.paperContainer}>
                    <div className={styles.purchaseFlex}>
                        <div>Purchase Orders</div>
                        <div className={styles.value}>This Month</div>
                    </div>
                    <div className={styles.bottomFlex}>
                        <div className={styles.imgFlex}>
                            <img src={require('../../assets/img/ic_purchase@2x.png')} height={40} className={styles.purImg}/>
                            <div>
                                <div>Order Quantity</div>
                                <div className={styles.qty}>0</div>
                            </div>
                        </div>
                        <div className={styles.amt}>
                            <div>Amount</div>
                            <div  className={styles.qty}>0</div>
                        </div>
                    </div>
                </div>
            </div>
        )
     }

    return (
        <div>
            <div className={styles.upperFlex}>
                <div className={styles.container}>
                    <VendorsOrdersTable/>
                </div>
                <div className={styles.barContainer}>
                   <div>
                       <BarChartComponent/>
                   </div>
                    <div>
                        {_renderPurchaseOrders()}
                    </div>
                </div>
                <div className={styles.pieContainer}>
                    <div>
                        <PieChartComponent/>
                    </div>
                    <div className={styles.inventory}>
                        {_renderInventoryMovement()}
                    </div>
                </div>
            </div>

            <div className={styles.lowerFlex}>
                <div className={styles.lhs}>
                    <InventoryCategoryTable/>
                </div>
                <div className={styles.rhs}>
                    <TopProductsTable/>
                </div>
            </div>

        </div>
    )
}

export default WarehouseView
