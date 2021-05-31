import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import TemplateList from "../../components/TemplateList";
import styles from "../../styles/FormTemplateBody.module.css";
import paginateStyle from "../../styles/Template.module.css";

import {
  filterTemplate,
  getTemplates,
} from "../../store/actions/action.creator";

const FormTemplate = ({ templates, total, ...props }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sliceData, setSliceData] = useState([]);
  const NUMBER_ON_PAGE = 15;

  useEffect(() => {
    if (total > 0) loadList();

    if (total <= 0 || total == undefined) props.getTemplates();
  }, [currentPage, total]);

  const loadList = () => {
    // to reduce whats rendered when page loads
    const begin = (currentPage - 1) * NUMBER_ON_PAGE;
    const end = begin + NUMBER_ON_PAGE;
    let sliced_data = null;

    if (props.filtering != true) {
      sliced_data = templates && templates.slice(begin, end);
    } else {
      sliced_data =
        props.filter_form_template &&
        props.filter_form_template.slice(begin, end);
    }

    setSliceData(sliced_data);
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
    props.filterTemplate(templates, filter_value);
  };

  return (
    <div className="template_body">
      <Header runFilter={(val) => handleFilter(val)} />
      <div className="">
        <div className={styles.alertDiv}>
          <div className={styles.alert}>
            <i className=""></i>
            <span>
              Tada! Get started with a free template, Can't find what you are
              looking for? Search from the 1000+ available templates
            </span>
            <span className={styles.closeBtn}>&times;</span>
          </div>
        </div>
        {!props.loading && (
          <TemplateList
            name={props.filter_data}
            templates={sliceData}
            total={total}
          />
        )}
      </div>
      <div className={paginateStyle.paginationDiv}>
        <Pagination
          total={total}
          currentPage={currentPage}
          next={handleNext}
          previous={handlePrevious}
        />
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
  filter_form_template: state.template.filter_form_template,
});

export default connect(mapStateToProps, { filterTemplate, getTemplates })(
  FormTemplate
);
