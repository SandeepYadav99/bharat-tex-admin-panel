import useExhibitorDetail from "./ExhibitorDetail.hook";
import styles from "./Style.module.css";

const ExhibitorDetail = () => {
    const { detail } = useExhibitorDetail({});

    return (
        <div className={styles.conatiner}>
            <div className={"plainPaper"}>
                <div className={styles.subContainer}>
                    <div style={{ width: "150px" }}>
                        <img
                            src={detail?.details?.company_logo}
                            alt="loogo"
                            width={"120px"}
                        />
                    </div>
                    <div className={styles.second}>
                        <div>
                            <div className={styles.headingDataType}>
                                <p className={styles.text}>Company Name:</p>
                                {detail?.details?.company_name}
                            </div>
                            <div className={styles.headingDataType}>
                                <p className={styles.text}>Brand Name:</p>
                                {detail?.details?.brand_name}
                            </div>
                            <div className={styles.headingDataType}>
                                <p className={styles.text}>Venue:</p>
                                {detail?.details?.event_venue}
                            </div>
                        </div>
                        <div>
                            <div style={{ height: "30px" }}> </div>
                            <div className={styles.headingDataType}>
                                <p className={styles.text}>Partner Type:</p>
                                {detail?.details?.company_name}
                            </div>
                            <div className={styles.headingDataType}>
                                <p className={styles.text}>Zone:</p>
                                {detail?.details?.zone_tag[0]}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.productListing}>
                    <div className={styles.headingDataType}>
                        <p className={styles.text}>Product Group:</p>{" "}
                        <div className={styles.wrappedContent}>
                            {detail?.details?.product_groups?.map((val) => (
                                <span>
                                    {val?.name},{""}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className={styles.headingDataType}>
                        <p className={styles.text}>Product Categories:</p>
                        <div className={styles.wrappedContent}>
                            {detail?.details?.product_categories?.map((val) => (
                                <span>
                                    {val?.name},{""}
                                </span>
                            ))}{" "}
                        </div>
                    </div>
                    <div className={styles.headingDataType}>
                        <p className={styles.text}>Product:</p>
                        <div className={styles.wrappedContent}>
                            {detail?.details?.products?.map((val) => (
                                <span>
                                    {val?.name},{""}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={"plainPaper"}>
                <div className={styles.second}>
                    <div>
                        <div className={styles.headingDataType}>
                            <p className={styles.text}>Person Name:</p>
                            {detail?.details?.company_perosn_name}
                        </div>
                        <div className={styles.headingDataType}>
                            <p className={styles.text}>Phone Number:</p>
                            {detail?.details?.primary_conatct_number}
                        </div>
                        <div className={styles.headingDataType}>
                            <p className={styles.text}>Website:</p>
                            {detail?.details?.website}
                        </div>
                        <div className={styles.headingDataType}>
                            <p className={styles.text}>Primary Email:</p>
                            {detail?.details?.primary_email}
                        </div>
                    </div>
                    <div>
                        <div className={styles.headingDataType}>
                            <p className={styles.text}>Designation:</p>
                            {detail?.details?.conatct_person_designation}
                        </div>
                        <div className={styles.headingDataType}>
                            <p className={styles.text}>Alternate Numbers:</p>
                            {detail?.details?.other_conatct_number}
                        </div>
                        <div className={styles.headingDataType}>
                            <p className={styles.text}>Address:</p>
                            {detail?.details?.company_address}
                        </div>
                        <div className={styles.headingDataType}>
                            <p className={styles.text}>Secondary Email:</p>
                            {detail?.details?.secondary_email}
                        </div>
                    </div>
                </div>
                <div className={styles.headingDataType}>
                    <p className={styles.text}>Instagram:</p>{" "}
                    {detail?.details?.instagram_link}
                </div>
                <div className={styles.headingDataType}>
                    <p className={styles.text}>Facebook:</p>
                    {detail?.details?.facebook_link}

                </div>
                <div className={styles.headingDataType}>
                    <p className={styles.text}>Twitter:</p>
                    {detail?.details?.twitter_link}

                </div>
                <div className={styles.headingDataType}>
                    <p className={styles.text}>Youtube:</p>{" "}
                    {detail?.details?.youtube_link}
                </div>
                <div className={styles.headingDataType}>
                    <p className={styles.text}>LinkedIn:</p>{" "}
                    {detail?.details?.linkedin_link}
                </div>
            </div>
            <div className={"plainPaper"}>
                <div className={styles.thirdPaper}>
                    <b>Product Category </b>
                    <div>
                        {detail?.details?.company_description}
                    </div>
                    <b>Gallery Images</b>
                </div>
                <div className={styles.wrappedContentImage}>
                    {detail?.details?.gallery_images.length > 0 ? detail?.details?.gallery_images?.map((val) => (
                        <img src={val} alt="images" height={"100px"} width={"100px"} />
                    )):"No Images Found"}
                </div>
                <div className={styles.lastBlock}>
                    <div className={styles.headingDataType}>
                        <p className={styles.text}>Created at:</p>
                        {detail?.details?.createdAt}
                    </div>
                    <div className={styles.headingDataType}>
                        <p className={styles.text}>Status:</p>
                        {detail?.details?.status}
                    </div>
                    <div className={styles.headingDataType}>
                        <p className={styles.text}>Updated on:</p>
                        {detail?.details?.updatedAt}
                    </div>{" "}
                </div>
            </div>
        </div>
    );
};

export default ExhibitorDetail;
