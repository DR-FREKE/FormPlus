import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import TemplateList from "../../components/TemplateList";
import Alert from "../../components/Alert";
import styles from "../../styles/FormTemplateBody.module.css";
import paginateStyle from "../../styles/Template.module.css";
import ErrorBanner from "../../components/ErrorBanner";
import Loader from "../../components/Loader";

import {
  filterTemplate,
  getTemplates,
  sortTemplateByOrder,
  searchTemplate,
  sortTemplateByDate,
} from "../../store/actions/action.creator";

const FormTemplate = ({ templates, total, ...props }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sliceData, setSliceData] = useState([]);
  const NUMBER_ON_PAGE = 15;

  useEffect(() => {
    if (total > 0) loadList();

    if ((total <= 0 || total == undefined) && !props.failed)
      props.getTemplates();
  }, [
    currentPage,
    total,
    props.sorting,
    props.searching,
    props.failed,
    props.date_sorting,
  ]);

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
    props.filterTemplate(props.original_templates, filter_value);
  };

  const handleSortOrder = (value) => {
    props.sortTemplateByOrder(templates, value);
    if (props.sorting == true) loadList();
  };

  const handleSortDate = (value) => {
    props.sortTemplateByDate(templates, value);
    if (props.date_sorting == true) loadList();
  };

  const handleSearch = (value) => {
    props.searchTemplate(props.original_templates, value);
  };

  const renderItem = () => {
    if (!props.loading && total > 0) {
      return (
        <TemplateList
          name={props.filter_data}
          templates={sliceData}
          total={total}
        />
      );
    } else {
      return <Loader loading={props.loading} />;
    }
  };

  return (
    <div className="template_body">
      <Header
        runFilter={handleFilter}
        sortOrder={handleSortOrder}
        search={handleSearch}
        sortDate={handleSortDate}
      />
      <div className="">
        <Alert styles={styles} />
        <ErrorBanner failed={props.failed} message={props.failed_message} />
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
  failed_message: state.template.failed_message,
  total: state.template.total,
  filtering: state.template.filtering,
  filter_data: state.template.filter_data,
  original_templates: state.template.original,
  sorting: state.template.sorting,
  date_sorting: state.template.date_sorting,
  searching: state.template.searching,
});

export default connect(mapStateToProps, {
  filterTemplate,
  getTemplates,
  sortTemplateByOrder,
  searchTemplate,
  sortTemplateByDate,
})(FormTemplate);
