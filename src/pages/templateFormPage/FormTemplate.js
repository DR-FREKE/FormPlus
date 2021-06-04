import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import TemplateList from "../../components/TemplateList";
import Alert from "../../components/Alert";
import styles from "../../styles/FormTemplateBody.module.css";
import paginateStyle from "../../styles/Template.module.css";

import {
  filterTemplate,
  getTemplates,
  sortTemplateByOrder,
  searchTemplate,
} from "../../store/actions/action.creator";

const Loader = () => (
  <div className={styles.spinnerContainer}>
    <div className={styles.spinner}></div>
  </div>
);

const FormTemplate = ({ templates, total, ...props }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sliceData, setSliceData] = useState([]);
  const NUMBER_ON_PAGE = 15;

  useEffect(() => {
    if (total > 0) loadList();

    if ((total <= 0 || total == undefined) && !props.failed)
      props.getTemplates();
  }, [currentPage, total, props.sorting, props.searching, props.failed]);

  const loadList = () => {
    // to reduce whats rendered when page loads
    const begin = (currentPage - 1) * NUMBER_ON_PAGE;
    const end = begin + NUMBER_ON_PAGE;
    let sliced_data = templates && templates.slice(begin, end);

    setSliceData(sliced_data);
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    //get the number on a Page
    const numberonPage = parseInt(Math.ceil(total / NUMBER_ON_PAGE));

    //check if number on page is not equal to current page, then increase currentpage
    if (currentPage != numberonPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    // check current page does not equal 1
    if (currentPage != 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilter = (filter_value) => {
    // let form_data;
    // if (props.sorting == true) {
    //   form_data = templates;
    // } else {
    //   form_data = props.original_templates;
    // }
    props.filterTemplate(props.original_templates, filter_value);
  };

  const handleSortOrder = (value) => {
    props.sortTemplateByOrder(templates, value);
    loadList();
  };

  const handleSearch = (value) => {
    props.searchTemplate(props.original_templates, value);
  };

  const renderItem = () => {
    if (!props.loading) {
      return (
        <TemplateList
          name={props.filter_data}
          templates={sliceData}
          total={total}
        />
      );
    } else {
      return <Loader />;
    }
  };

  return (
    <div className="template_body">
      <Header
        runFilter={handleFilter}
        sortOrder={handleSortOrder}
        search={handleSearch}
      />
      <div className="">
        <Alert styles={styles} />
        {/* <span>{props.failed && props.failed}</span> */}
        {renderItem()}
      </div>
      <div className={paginateStyle.paginationDiv}>
        {!props.loading && (
          <Pagination
            total={total}
            numberonPage={NUMBER_ON_PAGE}
            currentPage={currentPage}
            next={handleNext}
            previous={handlePrevious}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.template.loading,
  templates: state.template.form_template,
  failed: state.template.failed,
  total: state.template.total,
  filtering: state.template.filtering,
  filter_data: state.template.filter_data,
  original_templates: state.template.original,
  sorting: state.template.sorting,
  searching: state.template.searching,
});

export default connect(mapStateToProps, {
  filterTemplate,
  getTemplates,
  sortTemplateByOrder,
  searchTemplate,
})(FormTemplate);
