import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getTemplates } from "../../store/actions/action.creator";
import styles from "../../styles/onboard.module.css";
import img from "../../styles/images/logo3.png";

const OnBoarding = ({ total, templates, ...props }) => {
  const [showapp, setShowapp] = useState(false);
  //
  useEffect(() => {
    if (total > 0) {
      props.history.push("/form-template");
    } else {
      props.getTemplates();
    }
  }, [total]);

  return (
    <div className={styles.OnBoarding}>
      <div>
        <img src={img} alt="" />
      </div>
      <div className={styles.loadContainer}>
        <div className={styles.loader}>
          <span className={styles.shape}></span>
        </div>
      </div>
      <div>
        <small className={styles.messageText}>
          Have a wonderful experience
        </small>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.template.loading,
  templates: state.template.form_template,
  failed: state.template.failed,
  total: state.template.total,
});

export default connect(mapStateToProps, { getTemplates })(OnBoarding);
