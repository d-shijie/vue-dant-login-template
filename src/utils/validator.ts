export const checkPassword = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("请输入密码"));
  }
  if (value.length < 6) {
    callback(new Error("密码长度必须大于等于六位数"));
  } else {
    const regex1 = /^\d+$/;
    const regex2 = /^[A-Za-z]+$/;
    const regex3 =
      /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]+$/;
    if (regex1.test(value) || regex2.test(value) || regex3.test(value)) {
      callback("弱爆了");
    } else if (
      /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、\d]+$/.test(
        value
      ) ||
      /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、A-Za-z]+$/.test(
        value
      ) ||
      /^[A-Za-z\d]+$/.test(value)
    ) {
      callback("还不错");
    } else if (
      /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、A-Za-z\d]+$/.test(
        value
      )
    ) {
      callback();
    }
  }
};
